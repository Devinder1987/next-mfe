import Image from 'next/image';
import Link from 'next/link';
export function Header() {
  return (
    <header className="main-header">
      <div className="">
        <Link href="/">
          <Image
            src="/assets/An3Logo.png"
            alt="MyShop Logo"
            width={64}
            height={64}
            priority
            className="header-logo"
          />
        </Link>
      </div>
      <input className="" placeholder="Search products..." />
      <div className="">
        <span>👤 User</span>
        <span>🛒 Cart</span>
      </div>
    </header>
  );
}
