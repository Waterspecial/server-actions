"use client";

import { fetchListOfProducts } from "@/actions";
import { useEffect, useState } from "react";

function ClientPageExamples() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getListOfProducts() {
    setLoading(true);
    const data = await fetchListOfProducts();
    if (data) {
      setProducts(data);
      setLoading(false);
    }
  }
  useEffect(() => {
    getListOfProducts();
  }, []);

  if (loading) return <div>Loading products!!!, please wait</div>;

  return (
    <div>
      <h1>Client page server with examples</h1>
      <ul>
        {products && products.length > 0 ? (
          products.map((product) => {
            <li>{product?.title}</li>;
          })
        ) : (
          <h2>No products found</h2>
        )}
      </ul>
    </div>
  );
}

export default ClientPageExamples;
