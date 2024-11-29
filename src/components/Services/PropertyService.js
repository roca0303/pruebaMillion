
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
    
}
