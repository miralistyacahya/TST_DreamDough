interface Orders {
    order_id: string;
    customer_id: string;
    cake_id: string;
    order_date: string;
    pickup_date: string;
    order_status: string;
    addr: string | undefined;
    cake_img: string | undefined;
    created_at: string | null;
    updated_at: string | null;
}