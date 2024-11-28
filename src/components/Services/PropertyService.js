
export default class PropertyService {

    async getPropertyList(params) {
        try {

            const queryParams = new URLSearchParams(params).toString();
            const url = `https://localhost:7043/api/Property?${queryParams}`;

            const response = await fetch(`${url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
    
            if (!response.ok) {
                return "Error"; // O lanza un error si prefieres
            }
    
            const data = await response.json();
            
            return data; // Retorna los datos correctamente
        } catch (error) {
            return "Error"; // O lanza un error si prefieres
        }
    }
    
// //RXJS PATRIN DE DISEÑO
//     newEmpleado(empleadoData, token) {
//         var respuesta = fetch('http://localhost:43497/api/Alumno', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(empleadoData)
//         })
//         .then( function (data) {
//             if (data.status >= 300 ){
//                 return "Error";
//             }
//             else{
//                 const statusCode = data.status;
//                 const data_json = data.json();
//                 return { statusCode, data_json };
//             }
//         })
//         .catch(error => console.error('Error:', error));        
//         return respuesta;
//     }

//     deleteEmpleado(id) {
//         var respuesta = fetch('http://localhost:43497/api/Alumno/'+id.id, {
//             method: 'DELETE',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//         })
//         .then( function (data) {
//             console.log(data.status);
//             if (data.status >= 300 ){
//                 return "Error";
//             }
//             else{
//                 const statusCode = data.status;
//                 return { statusCode };
//             }
//         })
//         .catch(error => console.error('Error:', error));        
//         return respuesta;
//     }

//     updateEmpleado(empleadoData) {
//         var respuesta = fetch('http://localhost:43497/api/Alumno/'+empleadoData.id, {
//             method: 'PUT',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(empleadoData)
//         })
//         .then( function (data) {
//             console.log(data.status);
//             if (data.status >= 300 ){
//                 return "Error";
//             }
//             else{
//                 const statusCode = data.status;
//                 return { statusCode };
//             }
//         })
//         .catch(error => console.error('Error:', error));        
//         return respuesta;
//     }

}
