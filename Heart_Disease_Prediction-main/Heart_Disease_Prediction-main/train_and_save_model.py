import pickle
from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# Example Model Training (Replace with your actual model training process)
data = load_iris()
X = data.data
y = data.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

base_learners = [
    ('dt', DecisionTreeClassifier()),
    ('svc', SVC(probability=True))
]
stacked_model = StackingClassifier(estimators=base_learners, final_estimator=LogisticRegression())
stacked_model.fit(X_train, y_train)

# Save the model using pickle
with open('stacked_model.pkl', 'wb') as file:
    pickle.dump(stacked_model, file)

print("Model saved as 'stacked_model.pkl'")
