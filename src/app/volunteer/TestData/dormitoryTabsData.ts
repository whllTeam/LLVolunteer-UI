export const weekData = [
  {
    id: 1,
    name: '周一',
    isAllow: '1, 2' // 是否  开启，   背景 ( 节假日)
  },  {
    id: 2,
    name: '周二',
    isAllow: '1, 2'
  }, {
    id: 3,
    name: '周三',
    isAllow: '1, 2'
  }, {
    id: 4,
    name: '周四',
    isAllow: '1, 2'
  },  {
    id: 5,
    name: '周五',
    isAllow: '1,'
  }
];

export const weekTime = [
  {
    id: 1,
    name: '上午'
  },
  {
    id: 2,
    name: '下午'
  }
];

let userMap: Array<{
  key: string,
  data: Map<string, number>
}> = [];

let map = new Map<string, number>();
for (let i = 1; i < 6; i++) {
  for (let j = 1; j < 3; j++) {
    map.set(`${i},${j}`, i * j + 5);
  }
}
userMap.push({
  key: '1',  //  key  表示 宿舍楼 id
  data: map
});
userMap.push({
  key: '2',
  data: map
});
userMap.push({
  key: '3',
  data: map
});
export default userMap;
