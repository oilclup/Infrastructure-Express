<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import appConfig from '@src/app.config'
import Layout from '@layouts/main'

import StatChart from '@components/widget-stat-chart'
import Overview from '@components/overview'
import Member from '@components/member'
import Task from '@components/task'
import Chat from '@components/chat'
import axios from '@/axios'
//import _ from 'lodash'

import {
  revenueAreaChart,
  targetsBarChart,
  salesDonutChart,
  ordersData,
} from './data'

/**
 * Dashboard-1 Component
 */
export default {
  page: {
    title: 'Dashboard',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    VuePerfectScrollbar,
    Layout,
    StatChart,
    Overview,
    Member,
    Task,
    Chat,
  },
  data() {
    return {
      revenueAreaChart: revenueAreaChart,
      targetsBarChart: targetsBarChart,
      salesDonutChart: salesDonutChart,
      ordersData: ordersData,
      maxHeight: '328px',
      RecentOrders: [],
      startDate: undefined,
      endDate: undefined,
      overviewData: [],
      topSpending: [],
      statusCount: [],
      often: [],
      goals: [],
      interested: [],
      statChart: [
        {
          mainTitle: 'Total sales',
          value: 'loading...',
        },
        {
          mainTitle: 'Total submitted for settlement',
          value: 'loading...',
        },
        {
          mainTitle: 'cancel',
          value: 'loading...',
        },
      ],
      statChart2nd: [
        {
          mainTitle: 'New Member',
          value: 'Loading ...',
        },
      ],
      dateConfig: {
        mode: 'range',
      },
      selectedDate: [Date.parse('2020-07-23 06:56:42.169Z'), new Date()],
      series: [],
      buttonDate: 7,
    }
  },
  mounted() {
    this.renderdashboard()
  },
  methods: {
    convertDate(data) {
      const date = new Date(data)
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      return '' + date.getFullYear() + '-' + month + '-' + day
      // return date.toLocaleDateString()
    },
    async doSomethingOnChange(e) {
      // const f = new Date(e[0])
      // const l = new Date(e[1])
      // const range = l.getDate() - (f.getDate() - 1)
      // this.showRange = range
      // const labels = await this.getDaysInMonth(
      //   f.getDate(),
      //   f.getMonth(),
      //   f.getFullYear(),
      //   range
      // )
      // this.startDate = e[0]
      // this.endDate = e[1]
      // this.renderdashboard()
      // await this.$refs.mainChart.updateOptions(
      //   {
      //     xaxis: {
      //       type: 'string',
      //       categories: labels,
      //       tooltip: {
      //         enabled: false,
      //       },
      //       axisBorder: {
      //         show: false,
      //       },
      //     },
      //   },
      //   true
      // )
    },

    async renderdashboard() {
      let result = await axios.get(`/api/dashboard/getOrder`, {
        params: {
          startDate: this.startDate,
          endDate: this.endDate,
        },
      })
      let resultCustomerLast = await axios.get(`api/dashboard/getCustomerLast`)

      result.data = result.data.filter((x) => x.customer != null)
      let targetOrders = result.data.filter((x) => x.status == 'settling')

      this.getSeries(7)
      this.getStatChart(result.data)
      this.recentOrders(result.data)
      this.getNewCustomer(resultCustomerLast.data)
      this.Bestselling(targetOrders)
      this.topSelling(targetOrders)
    },

    async getNewCustomer(data) {
      this.statChart2nd = [
        {
          mainTitle: 'New Member',
          value: data,
        },
      ]
    },
    async getStatChart(data) {
      let targetCustomer = await axios.get(`/api/dashboard/getCustomer`)
      let oftencount = {
        day2: 0,
        day3: 0,
        day4: 0,
        day5: 0,
        day6: 0,
      }

      let goalsCount = {
        getAGreatWorkout: 0,
        loseWeight: 0,
        buildMuscle: 0,
        learnSelfDefense: 0,
        learnNewSkills: 0,
        learnFightTechiques: 0,
      }
      let interested = {
        aggressive: 0,
        defensive: 0,
        clinch: 0,
        punches: 0,
        kicks: 0,
        knees: 0,
        elbows: 0,
      }

      targetCustomer.data.map((x) => {
        if (x.fitnessAssessment) {
          if (x.fitnessAssessment.interested) {
            x.fitnessAssessment.interested.map((y) => {
              switch (y) {
                case 'Aggressive/forward style':
                  interested.aggressive += 1
                  break
                case 'Defensive fighting':
                  interested.defensive += 1
                  break
                case 'Clinch':
                  interested.clinch += 1
                  break
                case 'Punches':
                  interested.punches += 1
                  break
                case 'Kicks':
                  interested.kicks += 1
                  break
                case 'Knees':
                  interested.knees += 1
                  break
                case 'Elbows':
                  interested.elbows += 1
                  break
              }
            })
          }
          if (x.fitnessAssessment.goals) {
            x.fitnessAssessment.goals.map((y) => {
              switch (y) {
                case 'Get a great workout':
                  goalsCount.getAGreatWorkout += 1
                  break
                case 'Lose weight':
                  goalsCount.loseWeight += 1
                  break
                case 'Build muscle':
                  goalsCount.buildMuscle += 1
                  break
                case 'Learn self-defense':
                  goalsCount.learnSelfDefense += 1
                  break
                case 'Learn new skills':
                  goalsCount.learnNewSkills += 1
                  break
                case 'Learn fight techniques':
                  goalsCount.learnFightTechiques += 1
              }
            })
          }

          if (x.fitnessAssessment.often) {
            switch (x.fitnessAssessment.often) {
              case '2':
                oftencount.day2 += 1
                break
              case '3':
                oftencount.day3 += 1
                break
              case '4':
                oftencount.day4 += 1
                break
              case '5':
                oftencount.day5 += 1
                break
              case '6':
                oftencount.day6 += 1
            }
          }
        }
      })

      let amountSettling = 0
      let countSettling = 0
      let countSubmitted = 0
      let cancel = 0

      data.map((x) => {
        if (x.status == 'settling') {
          amountSettling += x.amount
          countSettling += 1
        } else if (x.status == 'submitted_for_settlement') {
          countSubmitted += 1
        } else {
          cancel += 1
        }
      })

      this.statChart = [
        {
          mainTitle: 'Total sales',
          value: amountSettling.toFixed(3),
        },

        {
          mainTitle: 'Total Member',
          value: targetCustomer.data.length,
        },
      ]

      this.statusCount = [
        {
          name: 'settling',
          count: countSettling,
        },
        { name: 'submitted_for_settlement', count: countSubmitted },
        { name: 'cancel', count: cancel },
      ]

      this.often = [
        {
          day: '2 days a week ',
          count: oftencount.day2,
          percent: (oftencount.day2 * 100) / targetCustomer.data.length,
        },
        {
          day: '3 days a week ',
          count: oftencount.day3,
          percent: (oftencount.day3 * 100) / targetCustomer.data.length,
        },
        {
          day: '4 days a week ',
          count: oftencount.day4,
          percent: (oftencount.day4 * 100) / targetCustomer.data.length,
        },
        {
          day: '5 days a week ',
          count: oftencount.day5,
          percent: (oftencount.day5 * 100) / targetCustomer.data.length,
        },
        {
          day: '6 days a week ',
          count: oftencount.day6,
          percent: (oftencount.day6 * 100) / targetCustomer.data.length,
        },
      ]

      this.goals = [
        {
          text: 'Get a great workout',
          count: goalsCount.getAGreatWorkout,
          percent:
            (goalsCount.getAGreatWorkout * 100) / targetCustomer.data.length,
        },
        {
          text: 'Lose weight',
          count: goalsCount.loseWeight,
          percent: (goalsCount.loseWeight * 100) / targetCustomer.data.length,
        },
        {
          text: 'Build muscle',
          count: goalsCount.buildMuscle,
          percent: (goalsCount.buildMuscle * 100) / targetCustomer.data.length,
        },
        {
          text: 'Learn self-defense',
          count: goalsCount.learnSelfDefense,
          percent:
            (goalsCount.learnSelfDefense * 100) / targetCustomer.data.length,
        },
        {
          text: 'Learn new skills',
          count: goalsCount.learnNewSkills,
          percent:
            (goalsCount.learnNewSkills * 100) / targetCustomer.data.length,
        },
        {
          text: 'Learn fight techniques',
          count: goalsCount.learnFightTechiques,
          percent:
            (goalsCount.learnFightTechiques * 100) / targetCustomer.data.length,
        },
      ]
      this.interested = [
        {
          text: 'Aggressive/forward style',
          count: interested.aggressive,
          percent: (interested.aggressive * 100) / targetCustomer.data.length,
        },
        {
          text: 'Defensive fighting',
          count: interested.defensive,
          percent: (interested.defensive * 100) / targetCustomer.data.length,
        },
        {
          text: 'Clinch',
          count: interested.clinch,
          percent: (interested.clinch * 100) / targetCustomer.data.length,
        },
        {
          text: 'Punches',
          count: interested.punches,
          percent: (interested.punches * 100) / targetCustomer.data.length,
        },
        {
          text: 'Kicks',
          count: interested.kicks,
          percent: (interested.kicks * 100) / targetCustomer.data.length,
        },
        {
          text: 'knees',
          count: interested.knees,
          percent: (interested.knees * 100) / targetCustomer.data.length,
        },
        {
          text: 'Elbows',
          count: interested.elbows,
          percent: (interested.elbows * 100) / targetCustomer.data.length,
        },
      ]
    },

    recentOrders(data) {
      let b = data.slice(Math.max(data.length - 5, 0))
      let arr = []
      b.map((x) => {
        let productname
        if (x.courseData) {
          productname =
            x.courseData.catagory.category_name + '-' + x.courseData.sub_name
        } else {
          // console.log(x)
          productname = x.courseData
        }
        arr = [
          {
            id: x.order_no,
            product: productname,
            name:
              x.customer !== null
                ? x.customer.firstName + ' ' + x.customer.lastName
                : '',
            price: x.amount,
            status: x.status,
          },
          ...arr,
        ]
      })
      this.RecentOrders = arr
    },

    topSelling(targetOrders) {
      let result = targetOrders.reduce((x, { customer, amount }) => {
        var temp = x.find((o) => {
          return o.customer._id == customer._id
        })
        if (temp) {
          temp.amount += amount
        } else {
          x.push({
            customer,
            amount,
          })
        }
        return x
      }, [])
      result.sort((a, b) => (a.amount < b.amount ? 1 : -1))
      let b = result.slice(0, 5)
      b.map((x) => {
        x.class = 'border-bottom py-4'
        x.value = x.amount.toFixed(3)
        x.title = x.customer.firstName + ' ' + x.customer.lastName
      })
      this.topSpending = b
    },
    Bestselling(targetOrders) {
      targetOrders = targetOrders.filter((x) => x.courseData != null)

      let result = targetOrders.reduce((x, { courseData, amount }) => {
        let count = 1
        var temp = x.find((o) => {
          return (
            o.courseData.sub_name == courseData.sub_name &&
            o.courseData.catagory.category_name ==
              courseData.catagory.category_name
          )
        })
        if (temp) {
          temp.amount += amount
          temp.count = temp.count + 1
        } else {
          count = 1

          x.push({
            courseData,
            amount,
            count,
          })
        }
        return x
      }, [])
      result.sort((a, b) => (a.count < b.count ? 1 : -1))
      let b = result.slice(0, 5)
      b.map((x) => {
        x.class = 'border-bottom py-4'
        x.value = x.count
        x.title = x.courseData.sub_name
      })

      this.overviewData = b
    },
    getCurrentDate() {
      const date = new Date()
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      const stringDate = '' + date.getFullYear() + '-' + month + '-' + day
      return stringDate
    },
    getDateRange(date, range) {
      if (range === 30) {
        const m = new Date()
        const firstDay = new Date(m.getFullYear(), m.getMonth(), 1)
        range = m.getDate() - firstDay.getDate() + 1
      }

      const lastWeek = new Date()
      lastWeek.setDate(lastWeek.getDate() - (range - 1))
      const days = []
      let idx = 0
      while (date.getMonth() && idx < range) {
        const d = new Date(lastWeek)
        const lday = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
        const lmonth =
          d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
        const arr = '' + d.getFullYear() + '-' + lmonth + '-' + lday
        days.push(arr)
        lastWeek.setDate(lastWeek.getDate() + 1)
        idx += 1
      }
      return days
    },
    getDaysInMonth(day, month, year, range) {
      //   if (range === 31) {
      //     const m = new Date()
      //     const firstDay = new Date(m.getFullYear(), m.getMonth(), 1)
      //     range = m.getDate() - firstDay.getDate() + 1
      //   }
      const date = new Date(year, month, day)
      const lastWeek = new Date()
      lastWeek.setDate(lastWeek.getDate() - (range - 1))
      const days = []
      let idx = 0
      while (date.getMonth() === month && idx < range) {
        const d = new Date(lastWeek)
        days.push(
          d.getDate() + ' ' + d.toLocaleString('en-us', { month: 'short' })
        )
        lastWeek.setDate(lastWeek.getDate() + 1)
        idx += 1
      }

      return days
    },

    async changeDate(range) {
      this.getSeries(range)
      this.buttonDate = range
      const date = new Date()
      const labels = await this.getDaysInMonth(
        date.getDate(),
        date.getMonth(),
        date.getFullYear(),
        range
      )

      await this.$refs.mainChart.updateOptions(
        {
          xaxis: {
            type: 'string',
            categories: labels,
            tooltip: {
              enabled: false,
            },
            axisBorder: {
              show: false,
            },
          },
        },
        true
      )
    },
    async getSeries(day) {
      let result = await axios.get(`/api/dashboard?day=${day}`)
      this.series = [result.data]
    },
  },
}
</script>

<template>
  <Layout>
    <div class="row page-title align-items-center">
      <div class="col-sm-4 col-xl-6">
        <h4 class="mb-1 mt-0">Dashboard</h4>
      </div>
      <div class="col-sm-8 col-xl-6">
        <form class="form-inline float-sm-right mt-3 mt-sm-0">
          <div class="form-group mb-sm-0 mr-2">
            <flat-pickr
              v-model="selectedDate"
              class="form-control"
              :config="dateConfig"
              name="date"
              @on-close="doSomethingOnChange"
            ></flat-pickr>
          </div>
          <!-- <div class="btn-group">
            <b-dropdown variant="primary" right>
              <template v-slot:button-content>
                <i class="uil uil-file-alt mr-1"></i>Download
                <i class="icon">
                  <feather type="chevron-down" class="align-middle"></feather>
                </i>
              </template>
              <b-dropdown-item href="#" class="notify-item">
                <feather
                  type="mail"
                  class="icon-dual icon-xs mr-2 align-middle"
                ></feather>
                <span>Email</span>
              </b-dropdown-item>
              <b-dropdown-item href="#" class="notify-item">
                <feather
                  type="printer"
                  class="icon-dual icon-xs mr-2 align-middle"
                ></feather>
                <span>Print</span>
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item href="#" class="notify-item">
                <feather
                  type="file"
                  class="icon-dual icon-xs mr-2 align-middle"
                ></feather>
                <span>Re-Generate</span>
              </b-dropdown-item>
            </b-dropdown>
          </div> -->
        </form>
      </div>
    </div>

    <div class="row">
      <div
        v-for="stat of statChart"
        :key="stat.mainTitle"
        class=" col-md-6 col-xl-3"
      >
        <StatChart
          :main-title="stat.mainTitle"
          :value="stat.value"
          :sub-value="stat.subValue"
          :chart-color="stat.chartColor"
        />
      </div>
      <div class=" col-md-6 col-xl-3">
        <StatChart
          :main-title="statChart2nd[0].mainTitle"
          :value="statChart2nd[0].value"
          :sub-value="statChart2nd[0].subValue"
          :chart-color="statChart2nd[0].chartColor"
        />
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="row">
          <div>
            <div class="card ">
              <div class="card-body ">
                <div class="table-responsive  mb-0">
                  <b-table-simple class="table table-hover table-nowrap mb-0">
                    <b-thead class="thead-white">
                      <b-tr>
                        <b-th>Order Status</b-th>

                        <b-th>Count</b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody>
                      <b-tr v-for="order in statusCount" :key="order.name">
                        <b-td>
                          <span
                            class="badge"
                            :class="{
                              'badge-soft-warning':
                                `${order.name}` === 'submitted_for_settlement',
                              'badge-soft-success':
                                `${order.name}` === 'settling',
                              'badge-soft-danger': `${order.name}` === 'cancel',
                            }"
                            >{{ order.name }}</span
                          >
                        </b-td>
                        <b-td>{{ order.count }}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-3">
        <Overview :items="overviewData" title="Best selling" />
      </div>
      <div class="col-xl-3">
        <Overview :items="topSpending" title="Top spending " />
      </div>

      <div class="col-xl-6">
        <div class="card">
          <div class="card-body pb-0">
            <ul class="nav card-nav float-right">
              <li class="nav-item">
                <a
                  :class="
                    `nav-link ${buttonDate === 1 ? 'active' : 'text-muted'}`
                  "
                  href="javascript: void(0);"
                  @click="changeDate(1)"
                  >Today</a
                >
              </li>
              <li class="nav-item">
                <a
                  :class="
                    `nav-link ${buttonDate === 7 ? 'active' : 'text-muted'}`
                  "
                  href="javascript: void(0);"
                  @click="changeDate(7)"
                  >7d</a
                >
              </li>
              <li class="nav-item">
                <a
                  :class="
                    `nav-link ${buttonDate === 15 ? 'active' : 'text-muted'}`
                  "
                  @click="changeDate(15)"
                  href="javascript: void(0);"
                  >15d</a
                >
              </li>
              <li class="nav-item">
                <a
                  :class="
                    `nav-link ${buttonDate === 30 ? 'active' : 'text-muted'}`
                  "
                  href="javascript: void(0);"
                  @click="changeDate(30)"
                  >1m</a
                >
              </li>
              <li class="nav-item">
                <a
                  :class="
                    `nav-link ${buttonDate === 365 ? 'active' : 'text-muted'}`
                  "
                  href="javascript: void(0);"
                  @click="changeDate(365)"
                  >1y</a
                >
              </li>
            </ul>
            <h5 class="card-title mb-0 header-title">Revenue</h5>
            <!-- Revenue Area Chart -->
            <apexchart
              ref="mainChart"
              type="area"
              height="500"
              :series="series"
              :options="revenueAreaChart.chartOptions"
            ></apexchart>
            <!-- end revenue chart -->
          </div>
        </div>
      </div>

      <!-- <div class="col-xl-3">
        <div class="card">
          <div class="card-body pb-0">
            <h5 class="card-title header-title">Targets</h5>

            <div class="mt-3">
              <apexchart
                type="bar"
                height="282"
                :series="targetsBarChart.series"
                :options="targetsBarChart.chartOptions"
              ></apexchart>
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <div class="row">
      <div class="col-xl-12">
        <div class="card ">
          <div class="card-body ">
            <h5 class="card-title mt-0 mb-0 header-title">Recent Orders</h5>
            <div class="table-responsive mt-4 mb-0">
              <b-table-simple class="table table-hover table-nowrap mb-0">
                <b-thead class="thead-white">
                  <b-tr>
                    <b-th>#</b-th>
                    <b-th>Product</b-th>
                    <b-th>Customer</b-th>
                    <b-th>Price</b-th>
                    <b-th>Status</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="order in RecentOrders" :key="order.name">
                    <b-td>{{ order.id }}</b-td>
                    <b-td>{{ order.product }}</b-td>
                    <b-td>{{ order.name }}</b-td>
                    <b-td>{{ order.price }}</b-td>
                    <b-td>
                      <span
                        class="badge"
                        :class="{
                          'badge-soft-warning':
                            `${order.status}` === 'submitted_for_settlement',
                          'badge-soft-success':
                            `${order.status}` === 'settling',
                          'badge-soft-danger': `${order.status}` === 'Declined',
                        }"
                        >{{ order.status }}</span
                      >
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class=" col-4">
        <div class="card ">
          <div class="card-body ">
            <div class="table-responsive  mb-0">
              <b-table-simple class="table table-hover table-nowrap mb-0">
                <b-thead class="thead-white">
                  <b-tr>
                    <b-th>Often per week</b-th>
                    <b-th
                      >Number<br />
                      of people
                    </b-th>
                    <b-th>Ratio</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="item in often" :key="item.day">
                    <b-td>
                      <span>{{ item.day }}</span>
                    </b-td>
                    <b-td>{{ item.count }}</b-td>
                    <b-td>{{ item.percent.toFixed(2) + '%' }}</b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
          </div>
        </div></div
      >

      <div class="card mr-3 ">
        <div class="card-body ">
          <div class="table-responsive  mb-0">
            <b-table-simple class="table table-hover table-nowrap mb-0">
              <b-thead class="thead-white">
                <b-tr>
                  <b-th>Goals</b-th>
                  <b-th
                    >Number <br />
                    of people
                  </b-th>
                  <b-th>Ratio</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="item in goals" :key="item.text">
                  <b-td>
                    <span>{{ item.text }}</span>
                  </b-td>
                  <b-td>{{ item.count }}</b-td>
                  <b-td>{{ item.percent.toFixed(2) + '%' }}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
        </div>
      </div>

      <div class="card ">
        <div class="card-body ">
          <div class="table-responsive  mb-0">
            <b-table-simple class="table table-hover table-nowrap mb-0">
              <b-thead class="thead-white">
                <b-tr>
                  <b-th>Interested</b-th>
                  <b-th class="tf-3"
                    >Number <br />
                    of people
                  </b-th>
                  <b-th>Ratio</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="item in interested" :key="item.text">
                  <b-td>
                    <span>{{ item.text }}</span>
                  </b-td>
                  <b-td>{{ item.count }}</b-td>
                  <b-td>{{ item.percent.toFixed(2) + '%' }}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="row">
      <div class="col-xl-4">
        <div class="card">
          <div class="card-body pt-2 pb-2">
            <h5 class="mb-4 header-title">Top Performers</h5>
            <div v-for="member of membersData" :key="member.name">
              <Member
                :image="member.image"
                :name="member.name"
                :text="member.text"
              />
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </Layout>
</template>
