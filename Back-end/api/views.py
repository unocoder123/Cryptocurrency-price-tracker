from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
from datetime import datetime
import pandas as pd
from sklearn.linear_model import LinearRegression

@api_view(['GET'])
def getData(request):
    coin = request.GET['coin']
    currency = request.GET['currency']
    dates = []
    milli = 86400000
    date= datetime.utcnow() - datetime(1970, 1, 1)
    seconds =(date.total_seconds())
    milliseconds = round(seconds*1000)
    for i in range(0, 32):
        dates.append(milliseconds + ((i + 1) * milli))

    dates_df = pd.DataFrame(dates)
    predict_df = dates_df.values.reshape(-1, 1)
    url = "https://api.coingecko.com/api/v3/coins/"+ coin + "/market_chart?vs_currency="+ currency + "&days=365"
    Data = requests.get(url).json()
    my_dict = {}
    for it in Data['prices']:
        key = it[0]
        val = round(it[1], 2)
        my_dict[key] = val

    df = pd.DataFrame(list(my_dict.items()), columns=['date','prices'])
    x = df['date'].values.reshape(-1,1)
    y = df['prices'].values.reshape(-1,1)
    algo = LinearRegression()
    algo.fit(x, y)
    results = algo.predict(predict_df)
    results_2 = results.tolist()
    results_3 = sum(results_2, [])
    final_result = []
    for i in range(0, 32):
        temp = [dates[i], results_3[i]]
        final_result.append(temp)
    data = {
        'results':final_result
    }
    return Response(data)