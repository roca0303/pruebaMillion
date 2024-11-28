import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import ProductService  from '../Services/PropertyService';
import Filters from '../Filters/Filters';
import { InputText } from 'primereact/inputtext';

export interface Product {
  id: string;
  ownerName: string;
  image: string;
  price: string;
  propertyAddress: number;
  propertyName: string;
}

export default function ResponsiveDemo() {

  interface ProductFilter {
    nombre: string;
    address: string;
    minprice: string;
    maxprice: string;
  }

  let emptyProperty = {
    nombre: '',
    address: '',
    minprice: '',
    maxprice: ''
  };


  const [product, setProduct] = useState<ProductFilter>({
    nombre: '',
    address: '',
    minprice: '',
    maxprice: ''
  });

  const [products, setProducts] = useState<Product[]>([]);

  const responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];
    
  useEffect(() => {
    const propertyService = new ProductService();
    propertyService.getPropertyList().then((data) => setProducts(data.slice(0, 9)));

  }, []);

  const productTemplate = (property: Product) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 ">
        <div className="mb-3">

          <img 
            src={`/images/${property.image}`} 
            alt={property.propertyName} 
            className="w-6 shadow-2" 
          />

        </div>
        <div>
          <h4 className="mb-1">{property.propertyName}</h4>
          <h6 className="mt-0 mb-3">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(property.price))}
          </h6>
          <Tag value={property.ownerName} ></Tag>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
            <Button icon="pi pi-search" className="p-button p-button-rounded" />
          </div>
        </div>
      </div>
    );
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof ProductFilter) => {
    const val = e.target.type === 'checkbox' ? (e.target.checked ? 'true' : 'false') : e.target.value;
    let _product = { ...product };
    _product[name] = val;   
    setProduct(_product);
  }

  const onSearchClick = () => {
    // pasar los parametros de busqueda
    const params = {
      propertyName: product.nombre,
      address: product.address,
      minprice: product.minprice,
      maxprice: product.maxprice
    };
    
    const propertyService = new ProductService();
    propertyService.getPropertyList(params).then(
      (data) => setProducts(data)
    );
  };

  return (
    <div>

      <div className="flex-container">
        <div className="field">
            <label htmlFor="nombre" className="htmlForTag">Name:  </label>
            <InputText id="nombre" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus  />
        </div>

        <div className="field">
            <label htmlFor="address" className="htmlForTag">Address:  </label>
            <InputText id="address" value={product.address} onChange={(e) => onInputChange(e, 'address')} required autoFocus  />          
        </div>

        <div className="field">
            <label htmlFor="minprice" className="htmlForTag">Min Price: </label>
            <InputText id="minprice" value={product.minprice} onChange={(e) => onInputChange(e, 'minprice')} required autoFocus style={{ width: '100px', padding: '5px' }} />
        </div>
        <div className="field">
            <label htmlFor="maxprice" className="htmlForTag">Max Price: </label>
            <InputText id="maxprice" value={product.maxprice} onChange={(e) => onInputChange(e, 'maxprice')} required autoFocus  style={{ width: '100px', padding: '5px' }} />          
        </div>


        <div className="field">
          <Button label="Buscar" icon="pi pi-search" onClick={onSearchClick} />
        </div>
      </div>

      <div className="divcarrusel">

        <div className="card">
            <Carousel value={products} numScroll={1} numVisible={3} responsiveOptions={responsiveOptions} circular
            autoplayInterval={4000} itemTemplate={productTemplate} />
        </div>
      </div>    
    </div>
  )
}
