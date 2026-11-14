export default function Atmosphere() {
  return (
    <>
      <div aria-hidden="true" className="atmosphere sceneFade">
        <div className="atmosphereRays" />
        <div className="atmosphereGrid" />
        <div className="atmosphereFog" />
        <div className="atmosphereVignette" />
      </div>
      <div aria-hidden="true" className="grain" />
    </>
  );
}
