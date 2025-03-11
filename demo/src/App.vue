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
import { useClone } from '../../src'
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
