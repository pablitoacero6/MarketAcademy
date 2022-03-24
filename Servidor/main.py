
from fastapi import FastAPI , File , UploadFile, Request
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
import sklearn

app = FastAPI()

@app.post("/algo/")
def get_iris(user: int,csv_rating: UploadFile = File(...)):    
    df_ratings = pd.read_csv(csv_rating.file)
    df_matrix = pd.pivot_table(df_ratings, values='rating', index='userId', columns='cursoId').fillna(0)
    df_matrix
    ratings = df_matrix.values
    sparsity = float(len(ratings.nonzero()[0]))
    sparsity /= (ratings.shape[0] * ratings.shape[1])
    sparsity *= 100

    ratings_train, ratings_test = train_test_split(ratings, test_size = 0.2, shuffle=False, random_state=42)

    sim_matrix = 1 - sklearn.metrics.pairwise.cosine_distances(ratings)

    sim_matrix_train = sim_matrix[0:24,0:24]

    users_predictions = sim_matrix_train.dot(ratings_train) / np.array([np.abs(sim_matrix_train).sum(axis=1)]).T
  
    # Inicio 
    usuario_ver = user
    user0=users_predictions.argsort()[usuario_ver]

    # Veamos los 20 recomendados con mayor puntaje en la predic para este usuario
    data = {}
    data['cursos_id'] = []
    for i, aRepo in enumerate(user0[-20:]):
        aux = str(aRepo+1)
        data['cursos_id'].append({
            'id':aux})  
    return data

@app.get("/alg/")
def get_iris(user: int):
    print(user)
    df_ratings = pd.read_csv("rating.cvs")
    df_matrix = pd.pivot_table(df_ratings, values='rating', index='userid', columns='cursoid').fillna(0)
    df_matrix
    ratings = df_matrix.values
    sparsity = float(len(ratings.nonzero()[0]))
    sparsity /= (ratings.shape[0] * ratings.shape[1])
    sparsity *= 100

    ratings_train, ratings_test = train_test_split(ratings, test_size = 0.2, shuffle=False, random_state=42)

    sim_matrix = 1 - sklearn.metrics.pairwise.cosine_distances(ratings)

    sim_matrix_train = sim_matrix[0:24,0:24]
    sim_matrix_test = sim_matrix[24:30,24:30]

    users_predictions = sim_matrix_train.dot(ratings_train) / np.array([np.abs(sim_matrix_train).sum(axis=1)]).T
  
    # Inicio 
    usuario_ver = user
    user0=users_predictions.argsort()[usuario_ver]

    # Veamos los 20 recomendados con mayor puntaje en la predic para este usuario
    data = {}
    data['cursos_id'] = []
    for i, aRepo in enumerate(user0[-20:]):
        aux = str(aRepo+1)
        data['cursos_id'].append({
            'id':aux})  
    return data