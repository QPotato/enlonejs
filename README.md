# enlonejs
Javascript wrapper for enl.one API

Install with:

```
npm install --save enlonejs
```


Example:
```TypeScript
import * as V from './v'

const v = new V.VEnlOne({apikey: 'YOUR API KEY GOES HERE'});
// or
// const v = new V.VEnlOne({oAuthToken: 'YOUR OAUTH GOES HERE'});
// You have to manage the OAuth flow yourself
(async () => {
    const quantic = (await v.search({query: 'QuanticPotato'}))[0];
    const potusito = (await v.search({query: 'Potusito'}))[0];

    console.log(await v.whoami());
    console.log(await v.trust((await v.whoami()).enlid));
    console.log((await v.search({query: 'QuanticPotato'}))[0]);
    console.log(await v.distance(quantic.enlid, potusito.enlid));
    console.log(await v.bulkInfo([quantic.enlid, potusito.enlid]));
    console.log(await v.bulkInfoArray([quantic.enlid, potusito.enlid]));
    console.log(await v.listTeams());
    console.log(await v.teamDetails((await v.listTeams())[0].teamid));
    console.log(await v.location(quantic.enlid))
})();
```