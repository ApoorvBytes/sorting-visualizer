import { useState, useEffect, useRef } from "react";
import "./App.css";

function App(){

const [array,setArray] = useState([]);
const [speed,setSpeed] = useState(40);
const [algorithm,setAlgorithm] = useState("bubble");
const [size,setSize] = useState(50);

const [comparisons,setComparisons] = useState(0);
const [swaps,setSwaps] = useState(0);
const [steps,setSteps] = useState(0);

const [isSorting,setIsSorting] = useState(false);

const pauseRef = useRef(false);

/* ---------------- ALGORITHM INFO ---------------- */

const algoInfo = {

bubble:{
name:"Bubble Sort",
best:"O(n)",
avg:"O(n²)",
worst:"O(n²)",
space:"O(1)"
},

selection:{
name:"Selection Sort",
best:"O(n²)",
avg:"O(n²)",
worst:"O(n²)",
space:"O(1)"
},

insertion:{
name:"Insertion Sort",
best:"O(n)",
avg:"O(n²)",
worst:"O(n²)",
space:"O(1)"
},

merge:{
name:"Merge Sort",
best:"O(n log n)",
avg:"O(n log n)",
worst:"O(n log n)",
space:"O(n)"
},

quick:{
name:"Quick Sort",
best:"O(n log n)",
avg:"O(n log n)",
worst:"O(n²)",
space:"O(log n)"
}

};

useEffect(()=>{
generateArray();
},[size]);

function generateArray(){

if(isSorting) return;

let newArr=[];

for(let i=0;i<size;i++){
newArr.push(Math.floor(Math.random()*300)+20);
}

setArray(newArr);
setComparisons(0);
setSwaps(0);
setSteps(0);

}

function sleep(ms){
return new Promise(r=>setTimeout(r,ms));
}

async function checkPause(){
while(pauseRef.current){
await sleep(50);
}
}

/* ---------------- BUBBLE SORT ---------------- */

async function bubbleSort(){

let arr=[...array];
let bars=document.getElementsByClassName("bar");

for(let i=0;i<arr.length;i++){

for(let j=0;j<arr.length-i-1;j++){

await checkPause();

bars[j].className="bar compare";
bars[j+1].className="bar compare";

setComparisons(c=>c+1);

await sleep(speed);

if(arr[j]>arr[j+1]){

bars[j].className="bar swap";
bars[j+1].className="bar swap";

let temp=arr[j];
arr[j]=arr[j+1];
arr[j+1]=temp;

setSwaps(s=>s+1);

setArray([...arr]);

await sleep(speed);

}

bars[j].className="bar default";
bars[j+1].className="bar default";

}

bars[arr.length-i-1].className="bar sorted";

}

setIsSorting(false);

}

/* ---------------- SELECTION SORT ---------------- */

async function selectionSort(){

let arr=[...array];
let bars=document.getElementsByClassName("bar");

for(let i=0;i<arr.length;i++){

let min=i;

bars[i].className="bar active";

for(let j=i+1;j<arr.length;j++){

await checkPause();

bars[j].className="bar compare";
setComparisons(c=>c+1);

await sleep(speed);

if(arr[j]<arr[min]){
min=j;
}

bars[j].className="bar default";

}

if(min!==i){

bars[i].className="bar swap";
bars[min].className="bar swap";

let temp=arr[i];
arr[i]=arr[min];
arr[min]=temp;

setSwaps(s=>s+1);
setArray([...arr]);

await sleep(speed);

}

bars[i].className="bar sorted";

}

setIsSorting(false);

}

/* ---------------- INSERTION SORT ---------------- */

async function insertionSort(){

let arr=[...array];
let bars=document.getElementsByClassName("bar");

for(let i=1;i<arr.length;i++){

let key=arr[i];
let j=i-1;

bars[i].className="bar active";

while(j>=0 && arr[j]>key){

await checkPause();

bars[j].className="bar compare";
setComparisons(c=>c+1);

arr[j+1]=arr[j];
j--;

setArray([...arr]);

await sleep(speed);

}

arr[j+1]=key;
setArray([...arr]);

}

for(let bar of bars){
bar.className="bar sorted";
}

setIsSorting(false);

}

/* ---------------- MERGE SORT ---------------- */

async function mergeSort(){

let arr=[...array];

await mergeSortHelper(arr,0,arr.length-1);

let bars=document.getElementsByClassName("bar");

for(let bar of bars){
bar.className="bar sorted";
}

setIsSorting(false);

}

async function mergeSortHelper(arr,left,right){

if(left>=right) return;

let mid=Math.floor((left+right)/2);

await mergeSortHelper(arr,left,mid);
await mergeSortHelper(arr,mid+1,right);

await merge(arr,left,mid,right);

}

async function merge(arr,left,mid,right){

let bars=document.getElementsByClassName("bar");

let leftArr=arr.slice(left,mid+1);
let rightArr=arr.slice(mid+1,right+1);

let i=0;
let j=0;
let k=left;

while(i<leftArr.length && j<rightArr.length){

bars[k].className="bar compare";

setComparisons(c=>c+1);

await sleep(speed);

if(leftArr[i]<=rightArr[j]){
arr[k]=leftArr[i++];
}else{
arr[k]=rightArr[j++];
}

setArray([...arr]);

bars[k].className="bar default";

k++;

}

while(i<leftArr.length){
arr[k++]=leftArr[i++];
setArray([...arr]);
await sleep(speed);
}

while(j<rightArr.length){
arr[k++]=rightArr[j++];
setArray([...arr]);
await sleep(speed);
}

}

/* ---------------- QUICK SORT ---------------- */

async function quickSort(){

let arr=[...array];

await quickSortHelper(arr,0,arr.length-1);

let bars=document.getElementsByClassName("bar");

for(let bar of bars){
bar.className="bar sorted";
}

setIsSorting(false);

}

async function quickSortHelper(arr,low,high){

if(low<high){

let pivotIndex=await partition(arr,low,high);

await quickSortHelper(arr,low,pivotIndex-1);
await quickSortHelper(arr,pivotIndex+1,high);

}

}

async function partition(arr,low,high){

let bars=document.getElementsByClassName("bar");

bars[high].className="bar pivot";

let pivot=arr[high];
let i=low-1;

for(let j=low;j<high;j++){

await checkPause();

bars[j].className="bar compare";
setComparisons(c=>c+1);

await sleep(speed);

if(arr[j]<pivot){

i++;

bars[j].className="bar swap";
bars[i].className="bar swap";

let temp=arr[i];
arr[i]=arr[j];
arr[j]=temp;

setSwaps(s=>s+1);

setArray([...arr]);

await sleep(speed);

}

bars[j].className="bar default";

}

let temp=arr[i+1];
arr[i+1]=arr[high];
arr[high]=temp;

setArray([...arr]);

return i+1;

}

/* ---------------- CONTROLS ---------------- */

function startSorting(){

if(isSorting) return;

setIsSorting(true);
pauseRef.current=false;

if(algorithm==="bubble") bubbleSort();
if(algorithm==="selection") selectionSort();
if(algorithm==="insertion") insertionSort();
if(algorithm==="merge") mergeSort();
if(algorithm==="quick") quickSort();

}

function pauseSorting(){
pauseRef.current=true;
}

function resumeSorting(){
pauseRef.current=false;
}

function resetSorting(){

pauseRef.current=false;
setIsSorting(false);
generateArray();

}

const info = algoInfo[algorithm];

return(

<div className="app">

<h1>ALGOVIZ</h1>
<p>Cyber Algorithm Visualizer</p>

<div className="controls">

<button onClick={generateArray}>Shuffle</button>

<select
value={algorithm}
onChange={(e)=>setAlgorithm(e.target.value)}
>

<option value="bubble">Bubble Sort</option>
<option value="selection">Selection Sort</option>
<option value="insertion">Insertion Sort</option>
<option value="merge">Merge Sort</option>
<option value="quick">Quick Sort</option>

</select>

<label>Size</label>

<input
type="range"
min="10"
max="120"
value={size}
onChange={(e)=>setSize(e.target.value)}
/>

<label>Speed</label>

<input
type="range"
min="5"
max="200"
value={speed}
onChange={(e)=>setSpeed(e.target.value)}
/>

<button onClick={startSorting}>Run</button>
<button onClick={pauseSorting}>Pause</button>
<button onClick={resumeSorting}>Resume</button>
<button onClick={resetSorting}>Reset</button>

</div>

<div className="stats">

<div className="card">
<span>Comparisons</span>
<h2>{comparisons}</h2>
</div>

<div className="card">
<span>Swaps</span>
<h2>{swaps}</h2>
</div>

<div className="card">
<span>Steps</span>
<h2>{steps}</h2>
</div>

<div className="card">
<span>Array Size</span>
<h2>{size}</h2>
</div>

</div>

<div className="algoHeader">

<h2>{info.name}</h2>

<span className="algoBadge">
{info.avg}
</span>

</div>

<div className="visualizer">

{array.map((value,index)=>(
<div
key={index}
className="bar default"
style={{height:value+"px"}}
/>
))}

</div>

<footer className="footer">

<p>
Built by <span>Apoorv Khobragade</span> • 7 Days 7 Projects Challenge
</p>

</footer>

</div>

);

}

export default App;