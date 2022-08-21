export default function BannerItem(name, link, icon) {
  return (
    <div>
      <img src={icon} alt={name} />

      <div>
        <h4>{name}</h4>
        <a herf="#">{link}</a>
      </div>
    </div>
  );
}
