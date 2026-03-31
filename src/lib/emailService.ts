import nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Email templates
export const emailTemplates = {
  orderConfirmation: (order: any) => ({
    subject: `Order Confirmation - ${order.orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - Lettuce Print</title>
        <style>
          body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background-color: #22c55e; color: white; padding: 32px; text-align: center; }
          .content { padding: 32px; }
          .order-details { background-color: #f8fafc; padding: 24px; border-radius: 8px; margin: 24px 0; }
          .item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
          .total { font-weight: bold; font-size: 18px; color: #22c55e; }
          .footer { background-color: #f8fafc; padding: 24px; text-align: center; font-size: 14px; color: #6b7280; }
          .button { display: inline-block; background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
            <p>Thank you for your order!</p>
          </div>
          
          <div class="content">
            <p>Dear ${order.customer.firstName},</p>
            <p>Thank you for choosing Lettuce Print! We're excited to work on your project. Your order has been received and is being processed.</p>
            
            <div class="order-details">
              <h2>Order Details</h2>
              <p><strong>Order Number:</strong> ${order.orderNumber}</p>
              <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
              
              <h3>Items Ordered:</h3>
              ${order.items.map((item: any) => `
                <div class="item">
                  <div>
                    <strong>${item.productName}</strong><br>
                    <small>Quantity: ${item.quantity}</small>
                  </div>
                  <div>$${item.totalPrice.toFixed(2)}</div>
                </div>
              `).join('')}
              
              <div class="item total">
                <div><strong>Total</strong></div>
                <div><strong>$${order.total.toFixed(2)}</strong></div>
              </div>
            </div>
            
            <h3>What's Next?</h3>
            <ul>
              <li>We'll review your order and contact you within 24 hours</li>
              <li>You'll receive a proof for approval before production</li>
              <li>We'll keep you updated on your order status</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/account/orders/${order.id}" class="button">
                Track Your Order
              </a>
            </div>
            
            <p>If you have any questions, please don't hesitate to contact us at info@lettuceprint.com or call us at (555) 123-4567.</p>
            
            <p>Thank you for your business!</p>
            <p><strong>The Lettuce Print Team</strong></p>
          </div>
          
          <div class="footer">
            <p>Lettuce Print - Brooklyn's Creative Print Partner</p>
            <p>123 Print Street, Brooklyn, NY 11201</p>
            <p>info@lettuceprint.com | (555) 123-4567</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Order Confirmation - ${order.orderNumber}
      
      Dear ${order.customer.firstName},
      
      Thank you for choosing Lettuce Print! Your order has been received and is being processed.
      
      Order Details:
      Order Number: ${order.orderNumber}
      Order Date: ${new Date(order.createdAt).toLocaleDateString()}
      
      Items Ordered:
      ${order.items.map((item: any) => `${item.productName} - Quantity: ${item.quantity} - $${item.totalPrice.toFixed(2)}`).join('\n')}
      
      Total: $${order.total.toFixed(2)}
      
      What's Next?
      - We'll review your order and contact you within 24 hours
      - You'll receive a proof for approval before production
      - We'll keep you updated on your order status
      
      Track your order: ${process.env.NEXT_PUBLIC_SITE_URL}/account/orders/${order.id}
      
      If you have any questions, please contact us at info@lettuceprint.com or (555) 123-4567.
      
      Thank you for your business!
      The Lettuce Print Team
    `,
  }),

  orderStatusUpdate: (order: any) => ({
    subject: `Order Status Update - ${order.orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Order Status Update - Lettuce Print</title>
        <style>
          body { font-family: 'Inter', sans-serif; margin: 0; padding: 20px; background-color: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 32px; border-radius: 8px; }
          .header { text-align: center; margin-bottom: 32px; }
          .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; }
          .status-processing { background-color: #fef3c7; color: #92400e; }
          .status-shipped { background-color: #dbeafe; color: #1e40af; }
          .status-delivered { background-color: #d1fae5; color: #065f46; }
          .button { display: inline-block; background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Status Update</h1>
            <div class="status-badge status-${order.status}">${order.status.replace('_', ' ').toUpperCase()}</div>
          </div>
          
          <p>Dear ${order.customer.firstName},</p>
          <p>Your order ${order.orderNumber} has been updated.</p>
          
          <h3>Current Status: ${order.status.replace('_', ' ').toUpperCase()}</h3>
          
          ${order.trackingNumber ? `
            <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
            <a href="#" class="button">Track Package</a>
          ` : ''}
          
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/account/orders/${order.id}" class="button">
            View Order Details
          </a>
          
          <p>Thank you for choosing Lettuce Print!</p>
        </div>
      </body>
      </html>
    `,
    text: `
      Order Status Update - ${order.orderNumber}
      
      Dear ${order.customer.firstName},
      
      Your order ${order.orderNumber} has been updated.
      
      Current Status: ${order.status.replace('_', ' ').toUpperCase()}
      
      ${order.trackingNumber ? `Tracking Number: ${order.trackingNumber}` : ''}
      
      View order details: ${process.env.NEXT_PUBLIC_SITE_URL}/account/orders/${order.id}
      
      Thank you for choosing Lettuce Print!
    `,
  }),
}

// Send email function
export const sendEmail = async (to: string, template: any) => {
  try {
    const info = await transporter.sendMail({
      from: `"Lettuce Print" <${process.env.SMTP_USER}>`,
      to,
      subject: template.subject,
      text: template.text,
      html: template.html,
    })

    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}

// Send order confirmation email
export const sendOrderConfirmation = async (order: any) => {
  const template = emailTemplates.orderConfirmation(order)
  return sendEmail(order.customer.email, template)
}

// Send order status update email
export const sendOrderStatusUpdate = async (order: any) => {
  const template = emailTemplates.orderStatusUpdate(order)
  return sendEmail(order.customer.email, template)
}