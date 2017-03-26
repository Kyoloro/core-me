#!/usr/bin/env node

'use strict'


const cp = require('child_process')

const sleepVal = process.argv[3]
const levels = parseInt(process.argv[2])

if (!levels) {
    console.log('please run exec with levels. just like: ./node_binary_tree.js 2')
    process.exit(1)
}

const randomNum = () => {
    // todo 产生随机数 1 ~ 150
    return parseInt(Math.random() * 150) + 1
}

const forkProcess = (currentLevel, pid, parentPId, leaf, max) => {
    let num = randomNum()
    // console.log(`PID:${pid}     ParentPID:${parentPId || 'top'}     RAND:${num}     LEAF:${leaf || 'top'}`)
    console.log(`PID:${pid}     ParentPID:${parentPId || 'top'}     RAND:${num}`)

    max = num > max ? num : max
    
    if (currentLevel !== levels) {
        let worker_right = cp.fork('./node_binary_tree.js', [String(levels)]) // 右子树
        let worker_left = cp.fork('./node_binary_tree.js', [String(levels)]) // 左子树
    
        worker_left.send(`${pid}_${currentLevel}_left_${max}`)
        worker_right.send(`${pid}_${currentLevel}_right_${max}`)

        worker_left.on('message', (msg) => {
            process.send(msg)
        })

        worker_right.on('message', (msg) => {
            process.send(msg)
        })
    } else {
        process.send(max)
    }
}

if (!process.send) {
    // 最顶树
    let worker_top = cp.fork('./node_binary_tree.js', [String(levels)])
    let bottomTreeNum = Math.pow(2, levels - 1)
    let maxNum = 0

    worker_top.on('message', (msg) => {
        maxNum = maxNum > parseInt(msg) ? maxNum : parseInt(msg)
        bottomTreeNum = bottomTreeNum - 1
        
        if (bottomTreeNum === 0) {
            console.log('')
            console.log(`MAX_RAND: ${maxNum}`)
        }
    })
    worker_top.send(`${process.pid}_0_top_0`)
    process.exit(1)
} else {
    process.on('message', (msg) => {
        let arr = msg.split('_')

        let parentPId = arr[0]
        let currentLevel = parseInt(arr[1]) + 1
        let leaf = arr[2]
        let max = parseInt(arr[3])

        forkProcess(currentLevel, process.pid, parentPId, leaf, max)
    })
}