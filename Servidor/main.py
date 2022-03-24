from turtle import clear
from fastapi import FastAPI
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
import sklearn
import csv

app = FastAPI()

@app.get("/alg")
def get_iris(user: int):
    # hace referencia al csv completo (userid,cursoid,rating)
    df_aux = pd.read_csv("public/data.csv")
    # hace referencia a indicador y id
    with open('public/id.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            df_aux.replace(to_replace = int(row['db_id']),  
                    value = int(row['userid']),  
                    inplace = True) 
    df_aux.to_csv('outputfile.csv', float_format= None,
                    index = False)

    df_ratings = pd.read_csv("outputfile.csv")
    df_users =  pd.read_csv("public/id.csv")

    df_matrix = pd.pivot_table(df_ratings, values='rating', index='userid', columns='cursoid').fillna(0)
    df_matrix

    ratings = df_matrix.values
    sparsity = float(len(ratings.nonzero()[0]))
    sparsity /= (ratings.shape[0] * ratings.shape[1])
    sparsity *= 100

    ratings_train, ratings_test = train_test_split(ratings, test_size = 0.2, shuffle=False, random_state=42)

    sim_matrix = 1 - sklearn.metrics.pairwise.cosine_distances(ratings)

    sim_matrix_train = sim_matrix[0:df_users.shape[0],0:ratings_train.shape[0]]

    users_predictions = sim_matrix_train.dot(ratings_train) / np.array([np.abs(sim_matrix_train).sum(axis=1)]).T


    #parametro user
    USUARIO_EJEMPLO = user # debe existir en nuestro dataset de train!
    data = df_users[df_users['db_id'] == USUARIO_EJEMPLO]
    usuario_ver = data.iloc[0]['userid'] -1 # resta 1 para obtener el index de pandas
    user0=users_predictions.argsort()[usuario_ver]

    # Veamos los 20 recomendados con mayor puntaje en la predic para este usuario
    data = {}
    data['cursos_id'] = []
    for i, aRepo in enumerate(user0[-20:]):
            aux = str(aRepo+1)
            data['cursos_id'].append({
                'id':aux})  
  
    return data
