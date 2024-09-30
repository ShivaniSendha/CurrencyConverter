// import { Component, OnInit } from '@angular/core';
// import axios from 'axios';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms'; // Import FormsModule

// @Component({
//   selector: 'app-currency-converter',
//   standalone: true,
//   imports: [CommonModule, FormsModule], // Include FormsModule here
//   templateUrl: './currency-converter.component.html',
//   styleUrls: ['./currency-converter.component.css']
// })
// export class CurrencyConverterComponent implements OnInit {
//   currencies: string[] = [];
//   baseCurrency: string = 'INR';
//   targetCurrency: string = 'USD';
//   amount: number = 0;
//   convertedAmount: number = 0;
//   lastUpdated: string = '';
//   loading: boolean = false; // Add loading property
//   errorMessage: string = ''; // Add errorMessage property

//   constructor() { }

//   ngOnInit() {
//     this.fetchCurrencies();
//   }

//   async fetchCurrencies() {
//     try {
//       const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR');
//       this.currencies = Object.keys(response.data.rates);
//       this.lastUpdated = response.data.date;
//     } catch (error) {
//       console.error('Error fetching currencies', error);
//       this.errorMessage = 'Failed to load currencies'; // Set error message
//     }
//   }

//   async convert() {
//     if (this.amount < 0) {
//       alert('Amount cannot be negative');
//       return;
//     }
//     this.loading = true; // Set loading to true
//     this.errorMessage = ''; // Clear previous error messages

//     try {
//       const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`);
//       const rate = response.data.rates[this.targetCurrency];
//       this.convertedAmount = this.amount * rate;
//     } catch (error) {
//       console.error('Error converting currency', error);
//       this.errorMessage = 'Failed to convert currency'; // Set error message
//     } finally {
//       this.loading = false; // Reset loading
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR');
      this.currencies = Object.keys(response.data.rates);
      this.lastUpdated = response.data.date;
    } catch (error) {
      console.error('Error fetching currencies', error);
      this.errorMessage = 'Failed to load currencies';
    }
  }

  async convert() {
    if (this.amount < 0) {
      alert('Amount cannot be negative');
      return;
    }
    this.loading = true;
    this.errorMessage = '';

    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`);
      const rate = response.data.rates[this.targetCurrency];
      this.convertedAmount = this.amount * rate;
    } catch (error) {
      console.error('Error converting currency', error);
      this.errorMessage = 'Failed to convert currency';
    } finally {
      this.loading = false;
    }
  }
}
