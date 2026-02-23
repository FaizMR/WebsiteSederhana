document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Marmut Meses Keju", img: "1.png", price: 20000 },
      { id: 2, name: "Marmut Keju", img: "2.png", price: 20000 },
      { id: 3, name: "Marmut Keju & Choco Cruncy", img: "3.png", price: 20000 },
      { id: 4, name: "Marmut Choco Cruncy", img: "4.png", price: 20000 },
      { id: 5, name: "Marmut", img: "5.png", price: 20000 },
      { id: 6, name: "Marmut", img: "6.png", price: 20000 },
      { id: 7, name: "Marmut", img: "7.png", price: 20000 },
      { id: 8, name: "Marmut", img: "8.png", price: 20000 },
      // { id: 9, name: "Marmut", img: "9.png", price: 20000 },
      // { id: 10, name: "Marmut", img: "10.png", price: 20000 },
      // { id: 11, name: "Marmut", img: "11.png", price: 20000 },
      { id: 12, name: "Marmut", img: "12.png", price: 20000 },
      { id: 13, name: "Marmut", img: "13.png", price: 20000 },
      { id: 14, name: "Marmut", img: "14.png", price: 20000 },
      { id: 15, name: "Marmut", img: "15.png", price: 20000 },
      { id: 16, name: "Marmut", img: "16.png", price: 20000 },
      { id: 17, name: "Marmut", img: "17.png", price: 20000 },
      { id: 18, name: "Marmut", img: "18.png", price: 20000 },
      { id: 19, name: "Marmut", img: "19.png", price: 20000 },
    ],
  }));
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama
      const cartItem = this.items.find((item) => item.id === newItem.id);
      // jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
      console.log(this.quantity);
    },
    remove(id) {
      // ambil item yang mau diremove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);
      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
