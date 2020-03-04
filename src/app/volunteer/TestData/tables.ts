const weekendays = [
  {
    name: '星期一',
    id: 1,
    isAllow: '1,2,3,4'
  },
  {
    name: '星期二',
    id: 2,
    isAllow: '1,2,3,4'
  },
  {
    name: '星期三',
    id: 3,
    isAllow: '1,2,3,4'
  },
  {
    name: '星期四',
    id: 4,
    isAllow: '1,2,3,4'
  },
  {
    name: '星期五',
    id: 5,
    isAllow: '1,2,3,4'
  }
];

const cards = [
  {
    name: '1-2节课',
    id: 1
  },
  {
    name: '3-4节课',
    id: 2
  },
  {
    name: '5-6节课',
    id: 3
  },
  {
    name: '7-8节课',
    id: 4
  }
];

let userMap: Array<{
  key: string,
  data: Map<string, number>
}> = [];

let map = new Map<string, number>();
for (let i = 1; i < 6; i++) {
  for (let j = 1; j < 5; j++) {
    map.set(`${i},${j}`, i * j + 5);
  }
}
userMap.push({
  key: '1',
  data: map
});
userMap.push({
  key: '2',
  data: map
});
export default userMap;
export const weekData = weekendays;
export const classData = cards;
