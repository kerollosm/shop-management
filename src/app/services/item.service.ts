import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  apiUrl: string = 'http://localhost:3000/items'
  obj: any
  constructor(private http: HttpClient) {
  }

  getAll(): any {
    
    return this.http.get(this.apiUrl)
  }
  getAllsort(): any {
    const requestUrl = `${this.apiUrl}?sort=price`;
    
    return this.http.get(requestUrl)
  }

  addItem(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/items', data)
  }
  updateItem(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data)
  }
  deleteItem(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/items/${id}`)

  }
  getSingle(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
  }


  subtractFromQuantity(itemId: number, quantityToSubtract: number): Observable<any> {
    console.log(`${this.apiUrl}/${itemId}`)

    return this.http.get(`${this.apiUrl}/${itemId}`).pipe(

      switchMap((item: any) => {
        console.log('1')

        const originalQuantity = item.quantity;

        if (originalQuantity < quantityToSubtract) {
          return throwError('Original quantity is less than the quantity to subtract');
        } else { 
          const newQuantity = Math.max(originalQuantity - quantityToSubtract, 0);
          const updatedItem = { ...item, quantity: newQuantity };
          console.log('233')
          return this.http.put(`${this.apiUrl}/${itemId}`, updatedItem);
        }

     
      }),
      catchError(error => {
        console.log('3')

        console.log(445434)
        return throwError('Error fetching item data');
      })
    );
  }
  sumToQuantity(itemId: number, quantityToSubtract: number): Observable<any> {

    return this.http.get(`${this.apiUrl}/${itemId}`).pipe(

      switchMap((item: any) => {
        console.log('1')

        const originalQuantity = item.quantity;

        
          const newQuantity = Math.max(originalQuantity + quantityToSubtract, 0);
          const updatedItem = { ...item, quantity: newQuantity };
          console.log('233')
          return this.http.put(`${this.apiUrl}/${itemId}`, updatedItem);
        

     
      }),
      catchError(error => {
        console.log('3')

        console.log(445434)
        return throwError('Error fetching item data');
      })
    );
  }

}
