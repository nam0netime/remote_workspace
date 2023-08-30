import requests
import os
import time

url = "http://dnslog.cn/getdomain.php"
c_url = "http://dnslog.cn/getrecords.php"
cookies = {"PHPSESSID": "lifbn6sn5ldridcupkaiakhnu1"}

response = requests.get(url,cookies=cookies)

if response.status_code == 200:
    # If the response contains JSON data
    start_time = time.time()
    end_time = start_time + 60
    i=0
    print(response.text)
    while time.time() < end_time:
        print(response.text)
        check_request = requests.get(c_url,cookies=cookies)
        result = check_request.json()
    
        if result != [] :
            print("Vulnerable")
        i += 1
        time.sleep(1)
    print("Loop run " + str(i))
else:
    print("Request failed with status code:", response.status_code)