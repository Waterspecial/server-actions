import { fetchListOfProducts } from "@/actions";

const ServerActionExamples = async () => {
  const products = await fetchListOfProducts();
  return (
    <div>
      <h1>Server Action with example - server component </h1>
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
};

export default ServerActionExamples;
