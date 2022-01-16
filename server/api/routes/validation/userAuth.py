createUserAccountSchema = {
    'type': 'object',
    'properties': {
        'first_name': {'type': 'string'},
        'last_name': {'type': 'string'},
        'email': {'type': 'string'},
        'phone_number': {'type': 'string'},
        'password': {'type': 'string'},
        'address': {'type': 'string'},
        'barangay_id': {'type': 'integer'},
        'designation_id': {'type': 'integer'},
    },
    'required': [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'password',
        'address',
        'barangay_id',
        'designation_id',
    ]
}

authenticateUser = {
    'type': 'object',
    'properties': {
        'email': {'type': 'string'},
        'password': {'type': 'string'},
    },
    'required': [
        'email',
        'password',
    ]
}