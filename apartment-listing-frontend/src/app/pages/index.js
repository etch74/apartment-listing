// pages/index.js
import { fetchApartments } from "./apartments";
import ApartmentList from "../components/ApartmentList";

export async function getServerSideProps() {
  const apartments = await fetchApartments();
  return {
    props: { apartments }, // Will be passed to the page component as props
  };
}

export default function Home({ apartments }) {
  return (
    <div>
      <h1>Apartment Listings</h1>
      <ApartmentList apartments={apartments} />
    </div>
  );
}
