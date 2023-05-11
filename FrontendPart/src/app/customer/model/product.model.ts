export class Product {

  constructor(
    public id?: any, //? means nullable i.e. values are not mandetory and next time creting
    //instance of class,that need not to be all values are required
public categoryName?: string,
public categoryId?: number,
public description?: string,
public price?: any,
public name?:string,
public status?:boolean,
public image?:string) { }
}
