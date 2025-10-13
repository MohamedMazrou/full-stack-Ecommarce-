import { Component } from '@angular/core';
import { NavAdminComponent } from '../../components/nav-admin/nav-admin.component';
import { NameEmailService } from '../../services/name-email.service';
import { Router } from 'express';
import { AddToCartService } from '../../services/add-to-cart.service';
import { ShowOvarLayService } from '../../services/show-ovar-lay.service';
import { NavDashbordComponent } from '../../components/auth-dashbord/nav-dashbord.component';
import { FooterUserComponent } from '../../components/footer-user/footer-user.component';
import { AuthFooterComponent } from '../../components/auth-footer/auth-footer.component';
import { RouterOutlet } from '@angular/router';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { IdateProfits } from '../../core/Interfaces/http';
import {
  Firestore,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  arrayRemove,
  DocumentSnapshot,
  DocumentData,
  DocumentReference,
} from '@angular/fire/firestore';
@Component({
  selector: 'app-dash-sales',
  standalone: true,
  imports: [
    NavAdminComponent,
    NavDashbordComponent,
    FooterUserComponent,
    AuthFooterComponent,
    RouterOutlet,
    NgxEchartsDirective,
  ],
  templateUrl: './dash-sales.component.html',
  styleUrl: './dash-sales.component.css',
})
export class DashSalesComponent {
  constructor(private _Firestore: Firestore) {}
  // profits = [
  //   { date: '2025-01-15', profit: 500 },
  //   { date: '2025-01-28', profit: 300 },
  //   { date: '2025-02-05', profit: 700 },
  //   { date: '2025-02-18', profit: 250 },
  //   { date: '2025-03-10', profit: 900 },
  // ];

  arrprofits!: any[];

  chartOptions: EChartsOption = {};

  ngOnInit() {
    const profits: DocumentReference<DocumentData, DocumentData> = doc(
      this._Firestore,
      'profits',
      'profits'
    );

   getDoc(profits).then( async(res)=>{
    console.log(res.data()?.['profits']);
     this.arrprofits = await res.data()?.['profits'];


    const monthly: { [key: string]: number } = {};
    for (const p of this.arrprofits) {
      // const d = new Date(p.date);
      // const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      const key = `${p.year}-${p.month}`;
      monthly[key] = (monthly[key] || 0) + Number(p.total);
    }


    const labels = Object.keys(monthly)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((k) => {
        const [y, m] = k.split('-');
        return `${m}/${y}`;
      });

    const values = Object.keys(monthly)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((k) => monthly[k]);

  
    // this.chartOptions = {
    //   tooltip: { trigger: 'axis' },
    //   legend: { data: ['أرباح الشهر'] },
    //   xAxis: { type: 'category', data: labels },
    //   yAxis: { type: 'value' },
    //   series: [
    //     {
    //       name: 'أرباح الشهر',
    //       type: 'line',
    //       smooth: true, // منحنى ناعم
    //       data: values,
    //     },
    //   ],
    // };
    const chartType = values.length > 1 ? 'line' : 'bar';

    this.chartOptions = {
      tooltip: { trigger: 'axis' },
      legend: { data: ['أرباح الشهر'] },
      xAxis: { type: 'category', data: labels },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'أرباح الشهر',
          type: chartType,
          smooth: true,
          data: values,
          symbol: 'circle',
          symbolSize: 12,
          lineStyle: { width: 2, color: '#4CAF50' },
          itemStyle: { color: '#4CAF50' },
        },
      ],
    };
    console.log('labels:', labels);
    console.log('values:', values);
  }
)}


}
