import herolist from './json/herolist.json';
import item from './json/item.json';
import summoner from './json/summoner.json';
import ming from './json/ming.json';

export default {
  '/apimock/web201605/js/herolist.json': herolist,
  'POST /apimock/herodetails.json': (req, res) => {
    const { ename } = req.body;
    const hero = herolist.filter(
      (item) => item.ename === parseInt(ename, 10),
    )[0];
    res.send({
      code: 0,
      message: 'success',
      data: hero, // TODO: 如果不是这个结构，报错?
    });
  },
  '/apimock/item.json': item,
  '/apimock/summoner.json': summoner,
  '/apimock/ming.json': ming,
};
