

const getGroupByCriteriaRecords = (items, key, occurance) =>{
    let hashSet = new Map()
    if(items && Array.isArray(items) && items.length>0){
        items.forEach((value)=>{
            //check is the key exists in property
            if(key in value){
                if(hashSet.has(value[key])){
                    hashSet.set(value[key],hashSet.get(value[key])+1)
                }
                else{
                    hashSet.set(value[key],1)
                }
            }
        })
        const groupedKeys = Array.from(hashSet, ([item, value]) => ({ item, value }));
        const havingMoreThenOneKeysArray = groupedKeys.filter(x=>x.value>occurance);
        const getKeysfromArray = havingMoreThenOneKeysArray.map(x=>x.item);
        const result = items.filter(keysfromall => getKeysfromArray.includes(keysfromall[key]));
        return result;
    }
    return [];
}
const excludeFromArrayByCriteria = (items,itemstoexclude,key) =>{
    let hashSet = new Set()
    if(itemstoexclude && Array.isArray(itemstoexclude) && itemstoexclude.length>0 && items && Array.isArray(items) && items.length>0){
        itemstoexclude.forEach((value)=>{
            //check is the key exists in property
            if(key in value){
                hashSet.add(value[key]);
            }
        })
        const allValuesToExclude = Array.from(hashSet);
        const result = items.filter(item => !allValuesToExclude.includes(item[key]));
        return result;
    }
    return items;
}
const distinctifyArrayByCriteria = (items,key) =>{
    let result = [];
    let hashSet = new Set()
    if(items && Array.isArray(items) && items.length>0){
        items.forEach((value)=>{
            //check is the key exists in property
            if(key in value){
                if(!hashSet.has(value[key])){
                    result.push(value)
                    hashSet.add(value[key])
                }
            }
        })
    }
    return result;
}

const recordsWithSameUser = (users)=> {
    return getGroupByCriteriaRecords(users,'username',1);
}
const recordsWithSameComment = (users)=> {
    return getGroupByCriteriaRecords(users,'comment_text',1);
}

const recordsWithSameDate = (users)=>{
    return getGroupByCriteriaRecords(users,'date',1);
}
const usersWithAllFiveStars = (users)=>{
    if(users && Array.isArray(users) && users.length>0){
        const result = users.filter(user => user.rating===50 &&
            user.customer_service_rating===50 &&
            user.quality_of_work_rating===50 &&
            user.friendliness_rating===50 &&
            user.pricing_rating===50 &&
            user.overall_experience_rating===50);

            return result;

    }
    return [];
}

const getTopNSuspectUsers = (users,topValue)=>{
    let result = [];
    let suspects = usersWithAllFiveStars(users);
    suspects = recordsWithSameDate(suspects);
    suspects = recordsWithSameUser(suspects);
    suspects = recordsWithSameComment(suspects);
    result = [...suspects];
    result = distinctifyArrayByCriteria(result,'username');
    if(result.length<topValue){ 
        users = excludeFromArrayByCriteria(users,result,'username');
        suspects = usersWithAllFiveStars(users);
        suspects = recordsWithSameDate(suspects);
        suspects = recordsWithSameUser(suspects);
        result = [...result,...suspects]
        result = distinctifyArrayByCriteria(result,'username');
    }
    if(result.length<topValue){ 
        users = excludeFromArrayByCriteria(users,result,'username');
        suspects = usersWithAllFiveStars(users);
        suspects = recordsWithSameDate(suspects);
        result = [...result,...suspects]
        result = distinctifyArrayByCriteria(result,'username');
    }
    if(result.length<topValue){ 
        users = excludeFromArrayByCriteria(users,result,'username');
        suspects = usersWithAllFiveStars(users);
        result = [...result,...suspects]
        result = distinctifyArrayByCriteria(result,'username');
    }
    return result.slice(0, topValue);
}

//const r = getTopNSuspectUsers(fakedada,3);
//console.log(r);

// these functions are exported for testing and for using externaly
module.exports = {
    usersWithAllFiveStars:usersWithAllFiveStars,
    getGroupByCriteriaRecords:getGroupByCriteriaRecords,
    excludeFromArrayByCriteria:excludeFromArrayByCriteria,
    distinctifyArrayByCriteria:distinctifyArrayByCriteria,
    getTopNSuspectUsers:getTopNSuspectUsers
};