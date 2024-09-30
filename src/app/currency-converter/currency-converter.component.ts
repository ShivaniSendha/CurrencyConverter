
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  currencies: string[] = [];
  baseCurrency: string = 'INR';
  targetCurrency: string = 'USD';
  amount: number = 0;
  convertedAmount: number | null = null;
  lastUpdated: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  historicalRates: number[] = [];
  historicalLabels: string[] = [];
  chart: any;

  // Statistics
  stats = {
    high: 0,
    low: 0,
    average: 0,
    volatility: 0,
    errorRate: 0 // Added error rate
  };

  constructor() { }

  ngOnInit() {
    this.fetchCurrencies();
    // this.fetchExchangeRateStatistics(); // Fetch statistics on initialization
  }

  async fetchCurrencies() {
    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`);
      this.currencies = Object.keys(response.data.rates);
      this.lastUpdated = response.data.date;
    } catch (error) {
      console.error('Error fetching currencies', error);
      this.errorMessage = 'Failed to load currencies';
    }
  }

  async fetchExchangeRateStatistics() {
    try {
      const response = await axios.get(`https://api.fastforex.io/historical?date=2024-09-16&from=${this.baseCurrency}&to=${this.targetCurrency}&api_key=13910129e8-424ce2f0e5-skgv5z`);

      console.log(`API Response for ${this.baseCurrency} to ${this.targetCurrency}:`, response.data);

      const results = response.data.results;
      if (!results || !results[this.targetCurrency]) {
        throw new Error('No rates found.');
      }

      const rate = results[this.targetCurrency];
  
      this.stats.high = rate;
      this.stats.low = rate;
      this.stats.average = rate;
      
      

    } catch (error) {
      console.error('Error fetching exchange rate statistics', error);
    }
  }

  onCurrencyChange() {
    console.log(`Selected Base Currency: ${this.baseCurrency}, Target Currency: ${this.targetCurrency}`);
    this.fetchExchangeRateStatistics();
  }


  async convert() {
    this.errorMessage = '';
    if (this.amount <= 0 || isNaN(this.amount)) {
      this.errorMessage = 'Please enter a valid amount greater than 0';
      return;
    }
    this.loading = true;

    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`);
      const rate = response.data.rates[this.targetCurrency];
      this.convertedAmount = this.amount * rate;



      this.fetchExchangeRateStatistics();
    } catch (error) {
      console.error('Error converting currency', error);
      this.errorMessage = 'Failed to convert currency';
    } finally {
      this.loading = false;
    }
  }
  exchangeCurrencies() {
    const temp = this.baseCurrency;
    this.baseCurrency = this.targetCurrency;
    this.targetCurrency = temp;

    // Fetch the new exchange rate statistics after the currencies are exchanged
    this.fetchExchangeRateStatistics();
  }
}

