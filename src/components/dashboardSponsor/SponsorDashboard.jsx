import SponsorProfileHeader from './SponsorProfileHeader';

const SponsorDashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Simulación de una llamada a la API
        fetchData().then(response => {
            setData(response.data);
        });
    }, []);

    return (
        <div>
            {data ? (
                <SponsorProfileHeader data={data} initialMerits={initialMerits} />
            ) : (
                <p>Cargando...</p> // Mensaje de carga mientras se obtienen los datos
            )}
        </div>
    );
}; 