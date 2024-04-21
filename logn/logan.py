import re
from collections import defaultdict
import matplotlib.pyplot as plt

def parse_log_file(file_path):
    log_data = defaultdict(int)
    with open(file_path, 'r') as file:
        for line in file:
            status_code = parse_log_line(line)
            log_data[status_code] += 1
    return log_data

def parse_log_line(line):
    # Regular expression to extract status code from Apache-style log line
    pattern = r'\s(\d{3})\s'
    match = re.search(pattern, line)
    if match:
        return match.group(1)
    else:
        return None

def visualize_log_data(log_data):
    status_codes = list(log_data.keys())
    counts = list(log_data.values())
    
    plt.bar(status_codes, counts, color='skyblue')
    plt.xlabel('HTTP Status Code')
    plt.ylabel('Count')
    plt.title('Distribution of HTTP Status Codes')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

if __name__ == '__main__':
    log_file_path = 'access.log'
    log_data = parse_log_file(log_file_path)
    visualize_log_data(log_data)
