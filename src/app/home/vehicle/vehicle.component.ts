import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../service/http.service";
import { PostResponse } from "../../module/PostResponse";
import { Chart } from 'angular-highcharts';
import { Vehicle } from "../../module/Vehicle";

@Component({
    selector: 'app-vehicle',
    templateUrl: './vehicle.component.html',
    styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

    vehiclesData: any
    providerChart: Chart
    seatsBarChart: Chart
    providerTable: any

    constructor(
        private httpService: HttpService
    ) { }

    ngOnInit() {
        this.httpService.fetchAllByTableName('vehicles').subscribe(
            (response: PostResponse) => {
                this.vehiclesData = response.msg
                this.statisticsProvider()
                // test function
                this.statisticsBySeats()
            },
            error => {
                console.log(error)
            }
        )
    }

    statisticsProvider() {
        let data = []
        let tempProviderArr = []
        this.vehiclesData.forEach((element: Vehicle) => {
            tempProviderArr.push(element.provider)
        });
        let providerArr = Array.from(new Set(tempProviderArr))
        providerArr.forEach(element => {
            let obj = {
                name: element,
                y: this.vehiclesData.filter(function(value) {
                    return value.provider == element
                }).length
            }
            data.push(obj)
        });

        this.providerTable = data

        let providerOptions = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'The Provider of Vehicle, 2018'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    }
                }
            },
            series: [{
                name: 'Pie',
                colorByPoint: true,
                data: data
            }]
        }

        // console.log(this.vehiclesData)

        this.providerChart = new Chart(providerOptions)
    }

    countBySeatRange(from: number, to: number, provider: String) {
        let result = 0
        this.vehiclesData.forEach((element, index) => {
            let seat = parseInt(element.numOfSeats)
            if (element.provider == provider) {
                if (seat >= from && seat <= to) {
                    result += 1
                }
            }
        });
        return result
    }

    statisticsBySeats() {
        let self = this
        let series = []
        let seatsRange = [
            {
                from: 1,
                to: 3
            },
            {
                from: 4,
                to: 6
            },
            {
                from: 7,
                to: 9
            },
            {
                from: 10,
                to: 12
            },
            {
                from: 13,
                to: 999
            }
        ]

        let barChartOptions = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Vehicle by Seats Range 2018'
            },
            subtitle: {
                text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
            },
            xAxis: {
                categories: [],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'seats',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ''
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: []
            // series: [{
            //     name: 'Year 1800',
            //     data: [107, 31, 635, 203, 2]
            // }, {
            //     name: 'Year 1900',
            //     data: [133, 156, 947, 408, 6]
            // }, {
            //     name: 'Year 2000',
            //     data: [814, 841, 3714, 727, 31]
            // }, {
            //     name: 'Year 2016',
            //     data: [1216, 1001, 4436, 738, 40]
            // }]
        }

        this.providerTable.forEach(element => {
            barChartOptions.xAxis.categories.push(element.name)
        });

        for (let index = 0; index < seatsRange.length; index++) {
            let minSeat = seatsRange[index].from
            let maxSeat = seatsRange[index].to
            let obj = {
                name: minSeat + '-' + maxSeat + ' seats',
                data: []
            }
            let finalData = []
            for (let i = 0; i < this.providerTable.length; i++) {
                finalData.push(this.countBySeatRange(minSeat, maxSeat, this.providerTable[i].name))
            }
            obj.data = finalData
            series.push(obj)
        }

        console.log(series)
        barChartOptions.series = series

        this.seatsBarChart = new Chart(barChartOptions)


    }

}
