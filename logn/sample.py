import random
from datetime import datetime, timedelta

def generate_log_entry():
    ip_address = '127.0.0.1'
    identity = '-'
    user = '-'
    timestamp = datetime.now().strftime('%d/%b/%Y:%H:%M:%S %z')
    method = random.choice(['GET', 'POST', 'PUT', 'DELETE'])
    url = '/page' + str(random.randint(1, 10))
    protocol = 'HTTP/1.1'
    status_code = random.choice([200, 404, 500, 302])
    response_size = random.randint(100, 10000)
    
    return f'{ip_address} {identity} {user} [{timestamp}] "{method} {url} {protocol}" {status_code} {response_size}\n'

if __name__ == '__main__':
    log_file_path = 'access.log'
    with open(log_file_path, 'w') as file:
        for _ in range(1000):
            log_entry = generate_log_entry()
            file.write(log_entry)
