import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropertyFilter from './Carrusel';
import { act } from 'react-dom/test-utils';

jest.mock('node-fetch', () => jest.fn());

describe('PropertyFilter Component', () => {
  test('should render all filter inputs and the search button', () => {
    render(<PropertyFilter />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();    
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/min price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max price/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument()
  });

  test('should update input values when user types', () => {
    render(<PropertyFilter />);

    const nameInput = screen.getByLabelText(/name/i);
    const addressInput = screen.getByLabelText(/address/i);
    const minPriceInput = screen.getByLabelText(/min price/i);
    const maxPriceInput = screen.getByLabelText(/max price/i);

    fireEvent.change(nameInput, { target: { value: 'House' } });
    fireEvent.change(addressInput, { target: { value: 'Street' } });
    fireEvent.change(minPriceInput, { target: { value: '1000' } });
    fireEvent.change(maxPriceInput, { target: { value: '5000' } });

    expect(nameInput).toHaveValue('House');
    expect(addressInput).toHaveValue('Street');
    expect(minPriceInput).toHaveValue('1000');
    expect(maxPriceInput).toHaveValue('5000');
  });


  // test('should fetch filtered properties when search button is clicked', async () => {
  //   const mockResponse = [
  //     { id: 1, name: 'House 1', address: 'Street 1', price: 2000 },
  //     { id: 2, name: 'House 2', address: 'Street 2', price: 3000 }
  //   ];

  //   global.fetch = jest.fn(() =>
  //     Promise.resolve(
  //       Object.create(Response.prototype, {
  //         ok: { value: true },
  //         status: { value: 200 },
  //         statusText: { value: 'OK' },
  //         headers: { value: new Headers({ 'Content-Type': 'application/json' }) },
  //         json: { value: () => Promise.resolve(mockResponse) },
  //         redirected: { value: false }, // Esto es un valor por defecto
  //         type: { value: 'basic' }, // Puede ser 'basic', 'cors', etc.
  //         url: { value: '' }, // Aquí puedes proporcionar una URL si es necesario
  //         clone: { value: jest.fn(() => Promise.resolve()) } // Implementación de clone
  //       })
  //     )
  //   );
    
  //   render(<PropertyFilter />);

  //   fireEvent.change(screen.getByPlaceholderText('Property Name'), {
  //     target: { value: 'House' }
  //   });
  //   fireEvent.change(screen.getByPlaceholderText('Address'), {
  //     target: { value: 'Street' }
  //   });

  //   fireEvent.click(screen.getByText('Search'));

  //   await waitFor(() => expect(screen.getByText('House 1 - Street 1 - 2000')).toBeInTheDocument());
  //   await waitFor(() => expect(screen.getByText('House 2 - Street 2 - 3000')).toBeInTheDocument());
  // });

  // test('should not show properties if no properties match the filter', async () => {
  //   const mockResponse: [] = [];

  //   global.fetch = jest.fn(() =>
  //     Promise.resolve(
  //       new Response(
  //         JSON.stringify(mockResponse), // El cuerpo de la respuesta, convertido a JSON
  //         {
  //           status: 200, // Código de estado
  //           statusText: 'OK', // Texto del estado
  //           headers: { 'Content-Type': 'application/json' }, // Encabezados
  //           // redirected: false, // Indica si la respuesta fue redirigida
  //           // url: 'https://localhost:7043/api/Property', // La URL de la respuesta
  //           // type: 'basic' // Tipo de la respuesta (puede ser 'basic', 'cors', etc.)
  //         }
  //       )
  //     )
  //   );
        
  //   render(<PropertyFilter />);

  //   fireEvent.change(screen.getByPlaceholderText('Property Name'), {
  //     target: { value: 'Non-existent House' }
  //   });
  //   fireEvent.click(screen.getByText('Search'));

  //   await waitFor(() => expect(screen.queryByText('House 1')).not.toBeInTheDocument());
  //   await waitFor(() => expect(screen.queryByText('House 2')).not.toBeInTheDocument());
  // });
});
