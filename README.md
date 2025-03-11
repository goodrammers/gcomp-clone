# useClone Composable

The `useClone` composable provides a way to manage a deep clone of your data (whether it is a plain object, a ref, or a reactive object) and detect changes between the clone and the original value. This is especially useful for form management, where you want to allow the user to apply changes only when there is a difference between the current and initial states.  
**Note:** No matter what type of value you pass as `initValue` (plain object, ref, or reactive object), the returned `clone` is always a `ref`. This means you can access the cloned data as `clone.value` in your script, while Vue's template unwrapping lets you directly use properties (e.g., `clone.name`).
## Installation
```shell
yarn add gcomp-clone
```
or
```shell
npm install gcomp-clone
```
> Vue must be installed as a peer dependency with a minimum version of 3.2.25.
## Usage
Below is an example showing how to use useClone with a plain object, a ref, and a reactive object.
```vue

<template>
    <div class="demo-root">
        <!-- Plain Object Example -->
        <div class="center mt-10">
            <p>Name:</p>
            <input class="ml-10" v-model="plainClone.name" />
            <p class="ml-20">Age:</p>
            <input class="ml-10" v-model="plainClone.age" type="number" />
        </div>

        <div class="center mt-10">
            <p>{{ hasChangedPlain ? 'Changed' : 'Same' }}</p>
            <div
                style="width: 100px; height: 100px"
                class="ml-10"
                :class="[hasChangedPlain ? 'changed' : 'same']"
            ></div>
            <button @click="update">Apply</button>
        </div>

        <!-- Ref Example -->
        <div class="center new-sample">
            <p>Name:</p>
            <input class="ml-10" v-model="refClone.name" />
            <p class="ml-20">Age:</p>
            <input class="ml-10" v-model="refClone.age" type="number" />
        </div>

        <div class="center mt-10">
            <p>{{ hasChangedRef ? 'Changed' : 'Same' }}</p>
            <div
                style="width: 100px; height: 100px"
                class="ml-10"
                :class="[hasChangedRef ? 'changed' : 'same']"
            ></div>
            <button @click="updateRef">Apply</button>
        </div>

        <!-- Reactive Object Example -->
        <div class="center new-sample">
            <p>Name:</p>
            <input class="ml-10" v-model="reactiveClone.name" />
            <p class="ml-20">Age:</p>
            <input class="ml-10" v-model="reactiveClone.age" type="number" />
        </div>

        <div class="center mt-10">
            <p>{{ hasChangedReactive ? 'Changed' : 'Same' }}</p>
            <div
                style="width: 100px; height: 100px"
                class="ml-10"
                :class="[hasChangedReactive ? 'changed' : 'same']"
            ></div>
            <button @click="updateReactive">Apply</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useClone } from 'gcomp-clone'
import { reactive, ref } from 'vue'


// Simulate receiving a shallow copy of data from an external source.
function mockApi<T>(data: T): T {
    return { ...data } as T
}

// --- Plain Object Example ---
const initialPlain = { name: 'Tom', age: 20 }
const { clone: plainClone, hasChanged: hasChangedPlain, setBase } = useClone(initialPlain)

function update() {
    const temp = mockApi(plainClone.value)
    setBase(temp)
}


// --- Ref Example ---
const initialRef = ref({ name: 'Tom Ref', age: 20 })
const { clone: refClone, hasChanged: hasChangedRef } = useClone(initialRef)

function updateRef() {
    initialRef.value = mockApi(refClone.value)
}


// --- Reactive Object Example ---
const initialReactive = reactive({ name: 'Tom Reactive', age: 20 })
const { clone: reactiveClone, hasChanged: hasChangedReactive } = useClone(initialReactive)

function updateReactive() {
    const temp = mockApi(reactiveClone.value)
    initialReactive.age = temp.age
    initialReactive.name = temp.name
}
</script>


<style>
body,
p {
    margin: 0;
}

.demo-root {
    width: 100vw;
    height: 100vh;
}

.mt-10 {
    margin-top: 10px;
}

.new-sample {
    margin-top: 30px;
    border-top: 1px solid #ccc;
    padding-top: 30px;
}

.ml-10 {
    margin-left: 10px;
}

.ml-20 {
    margin-left: 20px;
}

input {
    width: 100px;
    padding: 4px;
    text-align: center;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.same {
    background-color: teal;
}

.changed {
    background-color: coral;
}

button {
    margin-left: 10px;
    padding: 10px 20px;
    background-color: white;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
}
</style>

```
## Explanation
+ **Uniform Return Type:**  
No matter what type of initial value is provided, the useClone composable always 
returns a clone as a ref. In the script, you access the data via clone.value, 
but in templates Vue automatically unwraps refs, allowing you to bind directly 
(e.g., v-model="clone.name").

+ **Change Detection:**  
  The composable uses deep cloning (via lodash.clonedeep) and deep equality checking 
(via lodash.isequal) to detect changes. The computed property 
(hasChangedPlain, hasChangedRef, or hasChangedReactive) indicates whether the current clone 
differs from the original state.

+ **Applying Changes:**  
When you click the Apply button, the apply function updates the original state to match 
the current clone, effectively resetting the change detection.

+ **Usage Flexibility:**  
You can use `useClone` for plain objects, refs, or reactive objects, while always working 
with a ref for the clone, which simplifies handling in Vue templates.



## Notes
+ The `mockApi` function in this sample is used to simulate receiving a shallow copy of data from an external source.
+ The composable uses deep cloning (via lodash.clonedeep) and deep equality checking (via lodash.isequal) to manage and compare data states.
By using useClone, you can easily detect unsaved changes in your forms and trigger an action to apply those changes.
