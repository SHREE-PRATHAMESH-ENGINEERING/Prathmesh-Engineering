import nodemailer from "nodemailer";

interface Product {
  title: string;
  price: number;
}

interface OrderProduct {
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  company: string;
  adress: string;
  apartment: string;
  postalCode: string;
  dateTime?: string;
  status: string;
  total: number;
  city: string;
  country: string;
  orderNotice?: string;
  customer_order_product?: OrderProduct[];
}

export async function sendOrderConfirmationEmail(order: Order) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const primaryColor = "#5068a4";
    const secondaryColor = "#eaf1fb";

    const productsRows = (order.customer_order_product || []).map((item: OrderProduct) => {
        return `<tr>
          <td style='padding:8px;border-bottom:1px solid #eee;'>${item.product.title}</td>
          <td style='padding:8px;border-bottom:1px solid #eee;'>${item.quantity}</td>
          <td style='padding:8px;border-bottom:1px solid #eee;'>₹${item.product.price * item.quantity}</td>
        </tr>`;
    }).join("");

    const html = `
    <div style="font-family:Arial,sans-serif;background:${secondaryColor};padding:32px;">
      <div style="max-width:600px;margin:auto;background:white;border-radius:12px;box-shadow:0 2px 8px #eee;padding:32px;">
        <h2 style="color:${primaryColor};margin-bottom:8px;">Thank you for your order!</h2>
        <p style="font-size:16px;margin-bottom:16px;">Hi ${order.name},<br>Your order has been received and is being processed.</p>
        <div style="margin-bottom:24px;">
          <strong>Order ID:</strong> <span style="color:${primaryColor};font-weight:bold;">${order.id}</span><br>
          <strong>Date:</strong> ${order.dateTime ? new Date(order.dateTime).toLocaleString() : "-"}<br>
          <strong>Status:</strong> ${order.status}<br>
        </div>
        <h3 style="color:${primaryColor};margin-bottom:8px;">Order Summary</h3>
        <table style="width:100%;border-collapse:collapse;background:#f5f8ff;margin-bottom:24px;">
          <thead>
            <tr style="background:${primaryColor};color:white;">
              <th style='padding:8px;text-align:left;'>Product</th>
              <th style='padding:8px;text-align:left;'>Qty</th>
              <th style='padding:8px;text-align:left;'>Price</th>
            </tr>
          </thead>
          <tbody>
            ${productsRows}
          </tbody>
        </table>
        <div style="font-size:16px;margin-bottom:16px;">
          <strong>Total:</strong> <span style="color:${primaryColor};font-weight:bold;">₹${order.total}</span>
        </div>
        <div style="font-size:14px;color:#555;margin-bottom:16px;">
          <strong>Shipping Address:</strong><br>
          ${order.name} ${order.lastname}<br>
          ${order.adress}, ${order.apartment}<br>
          ${order.city}, ${order.country} - ${order.postalCode}<br>
          Phone: ${order.phone}<br>
        </div>
        <div style="font-size:13px;color:#888;">If you have any questions, reply to this email.<br>Thank you for shopping with us!</div>
      </div>
    </div>
  `;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: order.email,
        subject: `Order Confirmation - ${order.id}`,
        html,
    };

    await transporter.sendMail(mailOptions);
}