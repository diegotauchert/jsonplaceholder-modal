export default function Spinner() {
  return (
    <div className="container vh-100 text-center d-flex align-items-center justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
    </div>
  )
}