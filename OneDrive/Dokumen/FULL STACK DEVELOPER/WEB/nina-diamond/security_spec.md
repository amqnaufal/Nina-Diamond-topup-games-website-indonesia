# Security Spec

## Data Invariants
1. Users can only read and write their own profile data.
2. Transactions must be owned by the creator (`userId == request.auth.uid`).
3. Transaction prices must be an integer or float, but practically must refer to an internal item.
4. An invoice cannot be deleted once created.
5. Users can only create `pending` transactions.
6. Only admins can transition a transaction to `completed` or `cancelled`.

## Dirty Dozen Payloads
1. User creates profile with `role: "admin"`
2. User updates someone else's profile.
3. User creates transaction with someone else's `userId`.
4. User updates transaction `status` to `completed`.
5. User updates transaction `invoiceId`.
6. User creates transaction with missing required fields.
7. User creates a transaction with a massive string attack on `invoiceId`.
8. Unauthenticated user queries transactions.
9. User queries transactions but asks for ALL transactions (no where clause for `userId`).
10. Admin attempts to act as a normal user.
11. User deletes a transaction.
12. User updates the `price` of a transaction after creation.

