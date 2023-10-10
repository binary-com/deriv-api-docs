use Data::Dumper;
my $order = {
    other => {
        '$schema'            => 1,
        title                => 2,
        description          => 3,
        beta                 => 4,
        deprecated           => 4,
        hidden               => 5,
        type                 => 6,
        auth_required        => 7,
        auth_scopes          => 8,
        pattern              => 9,
        default              => 10,
        enum                 => 11,
        examples             => 12,
        additionalProperties => 13,
        minProperties        => 14,
        required             => 15,
        properties           => 16,
        passthrough          => 101,
        req_id               => 102,
    },
    properties => {
        subscription => 101,
        passthrough  => 103,
        echo_req     => 104,
        msg_type     => 105,
        req_id       => 106,
    },
};

my $order_send = $order;
$order_send->{properties}{loginid} = 102;


print(Data::Dumper::Dumper($order_send));
