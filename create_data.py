# insert into product (id, type, value, time) values ();
import random
import datetime

i = 0
for month in range(1, 2):
    # if month in [1, 3, 5, 7, 8, 10, 12]:
    #     for day in range(1, 32):
    #         for hour in range(24):
    #             id = ""
    #             if i < 10:
    #                 id = "6394879b-41a1-47b3-b984-e8fdabf4800" + str(i)
    #             elif i < 100:
    #                 id = "6394879b-41a1-47b3-b984-e8fdabf480" + str(i)
    #             elif i < 1000:
    #                 id = "6394879b-41a1-47b3-b984-e8fdabf48" + str(i)
    #             value = random.randint(2000, 4000) / 100
    #             time = datetime.datetime(2022, month, day, hour, 0, 0)
    #             s = "INSERT INTO climate (id, type, value, time) VALUES ('" + str(
    #                 id) + "', 'temp', " + str(value) + ", '" + str(time) + "');"
    #             print(s)
    #             i += 1
    if month == 1:
        for day in range(1, 32):
            for hour in range(24):
                id = ""
                if i < 10:
                    id = "6394879b-41a1-47b3-b984-e8fdabl1800" + str(i)
                elif i < 100:
                    id = "6394879b-41a1-47b3-b984-e8fdabl180" + str(i)
                elif i < 1000:
                    id = "6394879b-41a1-47b3-b984-e8fdabl18" + str(i)
                value = random.randint(100, 409600) / 100
                time = datetime.datetime(2022, month, day, hour, 0, 0)
                s = "INSERT INTO climate (id, type, value, time) VALUES ('" + str(
                    id) + "', 'soil', " + str(value) + ", '" + str(time) + "');"
                print(s)
                i += 1
    # if month in [4, 6, 9, 11]:
    #     for day in range(1, 31):
    #         for hour in range(24):
    #             id = ""
    #             if i < 10:
    #                 id = "6394879b-41a1-47b3-b984-e8fdabf4900" + str(i)
    #             elif i < 100:
    #                 id = "6394879b-41a1-47b3-b984-e8fdabf490" + str(i)
    #             elif i < 1000:
    #                 id = "6394879b-41a1-47b3-b984-e8fdabf49" + str(i)
    #             value = random.randint(2000, 4000) / 100
    #             time = datetime.datetime(2022, month, day, hour, 0, 0)
    #             s = "INSERT INTO climate (id, type, value, time) VALUES ('" + str(
    #                 id) + "', 'temp', " + str(value) + ", '" + str(time) + "');"
    #             print(s)
    #             i += 1


# for i in range(40):
#     value = random.randint(2000, 4000) / 100
#     time = datetime.time(i % 24, 0, 0)
#     s = "INSERT INTO climate (id, type, value, time) VALUES (i, 'temp', " + \
#         str(value) + ", 2023-04-26 " + str(time)
#     print(s)
