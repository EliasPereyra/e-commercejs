import BannerItem from "./BannerItem";

const payment_methods = [
  {
    name: "Credit Card",
    link: "See banks",
    icon: "",
  },
  {
    name: "Debit Card",
    link: "See more",
    icon: "",
  },
  {
    name: "Effective",
    link: "See more",
    icon: "",
  },
];

const PaymentMethods = () => (
  <ul>
    {payment_methods.map((method) => (
      <BannerItem
        key={method.name}
        name={method.name}
        link={method.link}
        icon={method.icon}
      />
    ))}
  </ul>
);

export default function Hero() {
  return (
    <section className="hero">
      <h1>Welcome to the CommerceJS</h1>
      <form>
        <input type="text" placeholder="Search a product" />
        <button>Search</button>
      </form>
    </section>
  );
}
