from passlib.hash import pbkdf2_sha256

cryptingAlgo = pbkdf2_sha256.using(rounds=117, salt_size=8)