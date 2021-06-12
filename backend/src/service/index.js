const fakedada = [
    { username: 'Erinjeffers5', rating: 50 },
    { username: 'Cullipher’s', rating: 48 },
    { username: 'Pamelachristopher', rating: 50 },
    { username: 'Mary1246', rating: 48 },
    { username: 'Randi Zuniga', rating: 48 },
    { username: 'Patricia McKinney', rating: 50 },
    { username: 'Brandy', rating: 50 },
    { username: 'Watsonamy35', rating: 50 },
    { username: 'Mel', rating: 50 },
    { username: 'avelin2509', rating: 50 },
    { username: 'Richard Irvine', rating: 50 },
    { username: 'Dawnypoo76.dd', rating: 50 },
    { username: 'Macierenee.d01', rating: 50 },
    { username: 'Washday51', rating: 50 },
    { username: 'Chrisrutledge1022', rating: 50 },
    { username: 'meganamadden', rating: 50 },
    { username: 'Jenna Cowling', rating: 50 },
    { username: 'scero1996', rating: 50 },
    { username: 'Hollyphillips18', rating: 50 },
    { username: 'Marc', rating: 50 },
    { username: 'chloe', rating: 50 },
    { username: 'Greg Galindo', rating: 50 },
    { username: 'gallegosliz0713', rating: 50 },
    { username: 'Christy', rating: 50 },
    { username: 'Shadenation94', rating: 50 },
    { username: 'Historymaster11', rating: 50 },
    { username: 'cuddlyone3', rating: 50 },
    { username: 'Stacie Mosley-Lynch', rating: 48 },
    { username: 'Leon Word', rating: 50 },
    { username: 'Amanda', rating: 50 },
    { username: 'dw', rating: 50 },
    { username: 'Cdatcher', rating: 50 },
    { username: 'Sekeitha', rating: 50 },
    { username: 'rbginvestments2', rating: 50 },
    { username: 'debbielmccoy12', rating: 50 },
    { username: 'justin.swanzy', rating: 50 },
    { username: 'pda1956', rating: 50 },
    { username: 'Echandy217', rating: 50 },
    { username: 'dart000', rating: 50 },
    { username: 'KenWW', rating: 50 },
    { username: 'Powell.jasmine4', rating: 50 },
    { username: 'judewdubois', rating: 50 },
    { username: 'Vanika13', rating: 42 },
    { username: 'cookie', rating: 50 },
    { username: 'Monica1815.mh', rating: 50 },
    { username: 'Monica1815.mh', rating: 50 },
    { username: 'Trish', rating: 50 },
    { username: 'regeorge41', rating: 50 },
    { username: 'albp22116', rating: 50 },
    { username: 'Kelseyclark89', rating: 50 },
    { username: 'Trestoncoleman', rating: 48 },
    { username: 'raymundoalvarez18', rating: 50 },
    { username: 'HappyCustomer', rating: 50 },
    { username: 'donnieb6680', rating: 50 },
    { username: 'reppond2southkorea', rating: 50 },
    { username: 'Daphne8403', rating: 50 },
    { username: 'Wisdom n jacklyn', rating: 48 },
    { username: 'vickiarlene52', rating: 50 },
    { username: 'Simpkinsarchie', rating: 48 },
    { username: 'Mandy S', rating: 50 },
    { username: 'Tasha', rating: 50 },
    { username: 'vnystel', rating: 50 },
    { username: 'Aleshia', rating: 48 },
    { username: 'Nathan and his Chevy', rating: 50 },
    { username: 'Kendall.Hurtt', rating: 50 },
    { username: 'Mechellegrahamtx', rating: 50 },
    { username: 'Mikaylaflournoy', rating: 50 },
    { username: 'mattgrahamtx', rating: 50 },
    { username: 'Gabs628', rating: 50 },
    { username: 'Jaimewinters2', rating: 50 },
    { username: 'K Hatch', rating: 50 },
    { username: 'dekota1', rating: 50 },
    { username: 'Jnicholson4472', rating: 50 },
    { username: 'ckennard1', rating: 50 },
    { username: 'Bubba B', rating: 50 },
    { username: 'Chevyandrews04', rating: 50 },
    { username: 'RGRANT', rating: 48 },
    { username: 'pmtcat2004', rating: 50 },
    { username: 'JWDuck57', rating: 43 },
    { username: 'aandrewslp', rating: 50 },
    { username: 'Shayla C', rating: 50 },
    { username: 'Kelsey Laird', rating: 50 },
    { username: 'Darrelldewyane2', rating: 50 },
    { username: 'Stephanie.veaseyste', rating: 50 },
    { username: 'louann326', rating: 50 },
    { username: 'renee9173', rating: 50 },
    { username: 'jlclem61', rating: 42 },
    { username: 'Arpfire36', rating: 50 },
    { username: 'Katherinetisdale', rating: 50 },
    { username: 'Garydowdy59', rating: 50 },
    { username: 'Lara Harrison', rating: 50 },
    { username: 'Abigail argueta', rating: 50 },
    { username: 'aliciabarton', rating: 43 },
    { username: 'donnalangston83', rating: 50 },
    { username: 'Midlifemom', rating: 50 },
    { username: 'Gabrielled1992', rating: 50 },
    { username: 'Jenngal2018', rating: 50 },
    { username: 'Lakethaphillips', rating: 50 },
    { username: 'Txsdadx4', rating: 50 },
    { username: 'Thehpysmiths', rating: 50 }
]

const getUsersWithMultipleOccurance = (users)=> {
    let result = [];
    let hashSet = new Map()
    if(users && Array.isArray(users)){
        users.forEach((value)=>{
            if(hashSet.has(value.username)){
                hashSet.set(value.username,hashSet.get(value.username)+1)
            }
            else{
                hashSet.set(value.username,1)
            }
        })
        const keys = Array.from(hashSet, ([username, value]) => ({ username, value }));
        const filter = keys.filter(x=>x.value>1);
        // hashSet.forEach((v,k)=>{
        //     console.log(k);
        // })
        return filter;
    }
    
}

console.log(getUsersWithMultipleOccurance(fakedada));

// these functions are exported for testing
module.exports = {
    getUsersWithMultipleOccurance:getUsersWithMultipleOccurance
};