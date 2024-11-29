import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import ProductService  from '../Services/PropertyService';
import Filters from '../Filters/Filters';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

export interface Product {
  id: string;
  idOwner: string;
  ownerName: string;
  image: string;
  price: string;
  propertyAddress: string;
  propertyName: string;
}

export default function ResponsiveDemo() {

  interface ProductFilter {
    nombre: string;
    address: string;
    minprice: string;
    maxprice: string;
  }

  let emptyProduct = {
    id: '',
    idOwner: '',
    ownerName: '',
    image: '',
    price: '',
    propertyAddress: '',
    propertyName: '',
  };
  

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
  const [cardPropertyInfo, setCardPropertyInfo] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Product>();

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

  const onInfoPropertyClick = (propertyId: string) => {

    // find property by id
    const propertyInfo = products.find((property) => property.id === propertyId);

    if (!propertyInfo) {
      return;
    }
    setSelectedProperty(propertyInfo);
    setCardPropertyInfo(true);
  };

  const hideDialog = () => {
    setCardPropertyInfo(false);
  }

  const productDialogFooter = (
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
    </React.Fragment>
  );

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
          <h5 className="mb-1">{property.propertyAddress}</h5>
          <h6 className="mt-0 mb-3">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(property.price))}
          </h6>
          <Tag value={property.ownerName} ></Tag>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
          <Button 
            icon="pi pi-search" 
            className="p-button p-button-rounded"  
            onClick={() => onInfoPropertyClick(property.id)} 
          />
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


      <Dialog visible={cardPropertyInfo} style={{ width: '450px' }} header={`Información de: ${selectedProperty?.propertyName || ''}`}  modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
        <p>Address: {selectedProperty?.propertyAddress}</p>
      </Dialog>



    </div>
  )
}
