const slime = {
    name: "슬라임"
}

const cuteSlime = {
    name: "슬라임",
    attribute:"cute"
}

const purpleCutSlime = {
    ...cuteSlime,
    color: "purple",
    name: "Slime"
} // name 부분이 슬라임에서 Slime 으로 덮어씌어짐

console.log(purpleCutSlime);

// 배열 spread

const nums = [1, 2, 3, 4, 5];
const nums2 = [...nums, 5, 6, 7, 8, 9, 10];
const nums3 = [...(nums2.filter(n => n % 2 === 0)), 11, 12, 14, 15];
console.log(nums);
console.log(nums2);
console.log(nums3);

const users = [
    {
        id: 1,
        name: "철수"
    },
    {
        id: 2,
        name:"영희"
    },
    {
        id: 3,
        name: "민지"
    },
    {
        id: 4,
        name: "길수"
    },
];

const evenUser = [...users.filter(user => user.id % 2 === 0), {id: 5, name: "민수"}]
console.log(evenUser);