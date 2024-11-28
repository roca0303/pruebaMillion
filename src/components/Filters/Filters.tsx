import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import ProductService from '../Services/PropertyService';
import { max } from 'moment';

const Filters: React.FC = () => {

  interface Product {
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


  const [product, setProduct] = useState(emptyProperty);


  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof Product) => {
    const val = e.target.type === 'checkbox' ? (e.target.checked ? 'true' : 'false') : e.target.value;
    let _product = { ...product };
    _product[name] = val; 
  
    setProduct(_product);
  }

  const onSearchClick = () => {
    // llamar al servicio PropertyService
    // Pero debo enviar los parametros de busqueda
    const propertyService = new ProductService();
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
    </div>
  );
};

export default Filters;