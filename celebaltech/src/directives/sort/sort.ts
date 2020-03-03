import { Directive, ElementRef, Renderer, Input } from '@angular/core';

/**
 * Generated class for the SortDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[sort]' // Attribute selector
})
export class SortDirective {
  @Input() data: any[];
  @Input('sortKey') key: any;
  private toggleSort: boolean = false;
  constructor (private el: ElementRef, private renderer: Renderer) {
  }

  ngOnInit () {
    this.renderer.listen(this.el.nativeElement, 'click', (event) => {
      let parentNode = this.el.nativeElement.parentNode;
      let children   = parentNode.children;
      console.log(this.data,this.key);
      if (this.data && this.key) {
        let sortedData: any = this.sortArray();
      }
      this.toggleSort = !this.toggleSort;
    })
  }

  sortArray (): Array<any> {
    let str1,str2;
    let tempArray: Array<any> = this.data;
    tempArray.sort((a, b) => {
      let aKey = a[this.key];
      if(isNaN(a[this.key])){
        str1= a[this.key].toLowerCase();
        str2= b[this.key].toLowerCase();
      }
      else{
       str1=a[this.key];
       str2 = b[this.key];
      }
        if (this.toggleSort) {
          if (str1 < str2) {
            return -1;
          }
          if (str1 > str2) {
            return 1;
          }
        }
        else {
          if (str1 > str2) {
            return -1;
          }
          if (str1 < str2) {
            return 1;
          }
        }
      return 0;
    });
    return tempArray;
  }
  // constructor() {
  //   console.log('Hello SortDirective Directive');
  // }

}
