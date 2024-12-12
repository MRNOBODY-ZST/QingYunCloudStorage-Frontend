<script lang="ts" setup>
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid'
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/vue/24/outline'
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref()

// 生成过去30天的日期数组
const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        dates.push(date.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }))
    }
    return dates
}

// 模拟数据
const uploadData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 500 + 1000))
const downloadData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 800 + 1500))
const shareData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 300 + 500))

onMounted(() => {
    const chart = echarts.init(chartRef.value)

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['上传数量', '下载数量', '分享数量'],
            top: 10,
            textStyle: {
                fontSize: 16,  // 这里可以调整图例文字大小
                fontWeight: 'bold'  // 可以设置为 'normal', 'bold', 'bolder'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: generateDates(),
            axisLabel: {
                rotate: 45
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '上传数量',
                type: 'line',
                smooth: true,
                data: uploadData,
                itemStyle: {
                    color: '#6366f1' // Tailwind indigo-500
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#6366f1' }, // indigo-500
                        { offset: 1, color: 'rgba(99, 102, 241, 0.1)' }
                    ])
                }
            },
            {
                name: '下载数量',
                type: 'line',
                smooth: true,
                data: downloadData,
                itemStyle: {
                    color: '#22c55e' // Tailwind green-500
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#22c55e' }, // green-500
                        { offset: 1, color: 'rgba(34, 197, 94, 0.1)' }
                    ])
                }
            },
            {
                name: '分享数量',
                type: 'line',
                smooth: true,
                data: shareData,
                itemStyle: {
                    color: '#ef4444' // Tailwind red-500
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ef4444' }, // red-500
                        { offset: 1, color: 'rgba(239, 68, 68, 0.1)' }
                    ])
                }
            }
        ]
    }

    chart.setOption(option)

    // 响应式处理
    window.addEventListener('resize', () => {
        chart.resize()
    })
})

const stats = [
    {
        id: 1,
        name: '总文件数',
        stat: '71,897',
        icon: UsersIcon,
        change: '122',
        changeType: 'increase',
    },
    {
        id: 2,
        name: '总下载数',
        stat: '58.16%',
        icon: EnvelopeOpenIcon,
        change: '5.4%',
        changeType: 'increase',
    },
    {
        id: 3,
        name: '总分享数',
        stat: '24.57%',
        icon: CursorArrowRaysIcon,
        change: '3.2%',
        changeType: 'decrease',
    },
]
</script>

<template>
    <div>
        <h3 class="text-base font-semibold text-gray-900">Last 30 days</h3>

        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div
                v-for="item in stats"
                :key="item.id"
                class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
                <dt>
                    <div class="absolute rounded-md bg-indigo-500 p-3">
                        <component :is="item.icon" aria-hidden="true" class="size-6 text-white" />
                    </div>
                    <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ item.name }}</p>
                </dt>
                <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p class="text-2xl font-semibold text-gray-900">{{ item.stat }}</p>
                    <p
                        :class="[
                            item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                            'ml-2 flex items-baseline text-sm font-semibold',
                        ]"
                    >
                        <ArrowUpIcon
                            v-if="item.changeType === 'increase'"
                            aria-hidden="true"
                            class="size-5 shrink-0 self-center text-green-500"
                        />
                        <ArrowDownIcon
                            v-else
                            aria-hidden="true"
                            class="size-5 shrink-0 self-center text-red-500"
                        />
                        <span class="sr-only">
                            {{ item.changeType === 'increase' ? 'Increased' : 'Decreased' }} by
                        </span>
                        {{ item.change }}
                    </p>
                    <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                        <div class="text-sm">
                            <a class="font-medium text-indigo-600 hover:text-indigo-500" href="#"
                                >View all<span class="sr-only"> {{ item.name }} stats</span></a
                            >
                        </div>
                    </div>
                </dd>
            </div>
        </dl>
    </div>
    <div class="mt-8">
        <div ref="chartRef" class="w-full h-[400px]"></div>
    </div>
</template>

<style scoped></style>
