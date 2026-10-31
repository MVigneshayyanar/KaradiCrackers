# SHORTENED MACHINE LEARNING PRACTICAL MANUAL

**10 Experiments | Concise algorithms and Python programs**

> Note: The programs retain the datasets, model settings and expected output values from the supplied manual. Graphs are produced when the program is run.

---

## 1. Python Basic Libraries for Machine Learning

**AIM:** To demonstrate Math, NumPy, Pandas, SciPy, Matplotlib and Scikit-learn.

### ALGORITHM

1. Import the required libraries.
2. Perform math and array operations.
3. Create a DataFrame and calculate statistics.
4. Plot salary data and train a linear regression model.
5. Display the results.

### PROGRAM

```python
import math
import numpy as np
import pandas as pd
from scipy import stats
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

print("Square Root of 25:", math.sqrt(25))
print("Sine of 30 degrees:", math.sin(math.radians(30)))
print("Factorial of 5:", math.factorial(5))

a = np.array([10, 20, 30, 40, 50])
print("\nNumPy Array:", a)
print("Mean:", np.mean(a))
print("Standard Deviation:", np.std(a))

df = pd.DataFrame({"Name": ["John", "Alice", "Bob"],
                   "Age": [25, 30, 22],
                   "Salary": [40000, 50000, 35000]})
print("\nPandas DataFrame:\n", df)
print("Average Salary:", df.Salary.mean())
print("Mode of Age column using SciPy:", stats.mode(df.Age, keepdims=True).mode[0])

plt.plot(df.Name, df.Salary, marker="o", color="green")
plt.title("Salary Distribution")
plt.xlabel("Employee"); plt.ylabel("Salary"); plt.grid()
plt.show()

X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 5, 4, 5])
model = LinearRegression().fit(X, y)
print("\nPredicted value for X=6:", model.predict([[6]])[0])
```

### OUTPUT (KEY RESULTS)

- Square Root: 5.0; Sine: 0.49999999999999994; Factorial: 120
- NumPy mean: 30.0; Standard deviation: 14.142135623730951
- Average salary: 41666.666666666664; SciPy mode of age: 22
- Predicted value for X=6: 5.0; Salary plot displayed.

**RESULT:** Thus, the Python libraries were successfully implemented for data analysis, computation and visualization.

---

## 2. Creation and Loading of Different Datasets

**AIM:** To create and load datasets using Python, NumPy, Pandas and Pickle.

### ALGORITHM

1. Import NumPy, Pandas and Pickle.
2. Create a dataset manually and a NumPy array.
3. Save and load the array using text files.
4. Save and load a DataFrame using CSV and Pickle.
5. Display the loaded datasets.

### PROGRAM

```python
import numpy as np
import pandas as pd
import pickle

data = {"Name": ["John", "Alice", "Bob"],
        "Age": [25, 30, 22],
        "Salary": [40000, 50000, 35000]}
print("Manual Dataset Created:\n", data)

a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print("\nNumPy Dataset:\n", a)
np.savetxt("numpy_data.txt", a)
print("\nNumPy data saved to 'numpy_data.txt'")
print("\nLoaded NumPy Dataset:\n", np.loadtxt("numpy_data.txt"))

df = pd.DataFrame(data)
print("\nPandas DataFrame:\n", df)
df.to_csv("dataset.csv", index=False)
print("\nDataset saved to 'dataset.csv'")
print("\nLoaded DataFrame from CSV:\n", pd.read_csv("dataset.csv"))

with open("dataset.pkl", "wb") as f:
    pickle.dump(df, f)
with open("dataset.pkl", "rb") as f:
    print("\nLoaded Dataset from Pickle File:\n", pickle.load(f))
```

### OUTPUT (KEY RESULTS)

- Manual dataset contains John, Alice and Bob with their age and salary.
- NumPy array is [[1,2,3],[4,5,6],[7,8,9]] and is saved/loaded successfully.
- The same three-row DataFrame is saved and loaded from CSV and Pickle.

**RESULT:** Thus, datasets were successfully created, saved and loaded using manual, NumPy, CSV and Pickle methods.

---

## 3. Mean, Median, Mode, Variance and Standard Deviation

**AIM:** To calculate statistical measures for a dataset using NumPy, Pandas and Statistics.

### ALGORITHM

1. Import the required libraries.
2. Load the Iris dataset and select sepal_length.
3. Calculate mean, median, mode, variance and standard deviation.
4. Display the values.

### PROGRAM

```python
import pandas as pd
import numpy as np
import statistics as st

url = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv"
df = pd.read_csv(url)
print("Dataset Loaded Successfully!\n")
print(df.head())

x = df["sepal_length"]
print("\nStatistical Computations for 'sepal_length':")
print("Mean:", round(np.mean(x), 3))
print("Median:", round(np.median(x), 3))
print("Mode:", st.mode(x))
print("Variance:", round(np.var(x), 3))
print("Standard Deviation:", round(np.std(x), 3))
```

### OUTPUT (KEY RESULTS)

- Mean: 5.843
- Median: 5.8
- Mode: 5.0
- Variance: 0.685
- Standard Deviation: 0.828

**RESULT:** Thus, the five statistical measures were successfully calculated for the Iris dataset.

---

## 4. Reshaping, Filtering, Merging and Handling Missing Values

**AIM:** To reshape, filter, merge and handle missing values using Pandas and NumPy.

### ALGORITHM

1. Import Pandas and NumPy and create two DataFrames.
2. Reshape data using melt().
3. Filter records where Age is greater than 25.
4. Merge both datasets using an outer join.
5. Check and fill missing values.

### PROGRAM

```python
import pandas as pd
import numpy as np

df1 = pd.DataFrame({"ID": [1, 2, 3, 4],
                    "Name": ["John", "Alice", "Bob", "Mary"],
                    "Age": [25, 30, np.nan, 35]})
df2 = pd.DataFrame({"ID": [3, 4, 5, 6],
                    "Department": ["IT", "CSE", "ECE", "EEE"],
                    "Salary": [45000, 50000, 40000, np.nan]})
print("Dataset 1:\n", df1)
print("\nDataset 2:\n", df2)

print("\nReshaped Data (Using melt):\n",
      pd.melt(df1, id_vars=["ID"], var_name="Attribute", value_name="Value"))
print("\nFiltered Data (Age > 25):\n", df1[df1.Age > 25])

m = pd.merge(df1, df2, on="ID", how="outer")
print("\nMerged Data (Outer Join):\n", m)
print("\nChecking for Missing Values:\n", m.isnull().sum())

m["Age"] = m.Age.fillna(m.Age.mean())
m["Salary"] = m.Salary.fillna(0)
m["Department"] = m.Department.fillna("Not Assigned")
print("\nAfter Handling Missing Values:\n", m)
```

### OUTPUT (KEY RESULTS)

- Reshaped data contains ID, Attribute and Value columns.
- Filtered records: Alice (30) and Mary (35).
- Outer merge contains IDs 1 to 6.
- Missing counts: Name 2, Age 2, Department 2, Salary 1.
- Missing Age values are filled with 30; Salary with 0; Department with Not Assigned.

**RESULT:** Thus, reshaping, filtering, merging and missing-value handling were successfully performed.

---

## 5. Candidate Elimination Algorithm

**AIM:** To find the specific and general hypothesis boundaries for a training dataset.

### ALGORITHM

1. Initialize the specific hypothesis as empty and general hypotheses as '?'.
2. Process each training example.
3. For positive examples, generalize the specific hypothesis.
4. For negative examples, specialize the general hypothesis.
5. Display the final boundaries.

### PROGRAM

```python
import numpy as np

data = np.array([
    ["Sunny", "Warm", "Normal", "Strong", "Warm", "Same", "Yes"],
    ["Sunny", "Warm", "High", "Strong", "Warm", "Same", "Yes"],
    ["Rainy", "Cold", "High", "Strong", "Warm", "Change", "No"],
    ["Sunny", "Warm", "High", "Strong", "Cool", "Change", "Yes"]
])
X, y = data[:, :-1], data[:, -1]

def learn(X, y):
    S = None
    G = [["?"] * len(X[0]) for _ in X[0]]
    for i, label in enumerate(y):
        if label == "Yes":
            if S is None:
                S = X[i].copy()
            else:
                for j in range(len(S)):
                    if S[j] != X[i][j]:
                        S[j] = "?"
                        G[j][j] = "?"
        else:
            for j in range(len(X[0])):
                G[j][j] = S[j] if S[j] != X[i][j] else "?"
    G = [h for h in G if h != ["?"] * len(X[0])]
    return S, G

s, g = learn(X, y)
print("\nFinal Specific Hypothesis:", s)
print("Final General Hypotheses:", g)
```

### OUTPUT (KEY RESULTS)

- Final Specific Hypothesis: ['Sunny' 'Warm' '?' 'Strong' '?' '?']
- Final General Hypotheses: [['Sunny', '?', '?', '?', '?', '?']]

**RESULT:** Thus, the Candidate Elimination algorithm was implemented and the specific and general boundaries were obtained.

---

## 6. Simple Linear Regression

**AIM:** To implement Simple Linear Regression and plot the relationship between experience and salary.

### ALGORITHM

1. Import the required libraries and create the dataset.
2. Separate independent and dependent variables.
3. Split data into training and testing sets.
4. Train the Linear Regression model and predict values.
5. Display coefficients, predictions and the graph.

### PROGRAM

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

df = pd.DataFrame({"Experience": range(1, 11),
                   "Salary": [15000, 18000, 21000, 24000, 28000,
                              30000, 33000, 36000, 40000, 42000]})
print("Dataset:\n", df)

X, y = df[["Experience"]], df["Salary"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=0)

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)
print("\nIntercept (b0):", model.intercept_)
print("Coefficient (b1):", model.coef_[0])

plt.scatter(X, y, label="Actual Data")
plt.plot(X, model.predict(X), label="Regression Line")
plt.title("Simple Linear Regression - Experience vs Salary")
plt.xlabel("Years of Experience"); plt.ylabel("Salary")
plt.legend(); plt.grid(); plt.show()
print("\nPredicted Values for Test Data:\n", pred)
```

### OUTPUT (KEY RESULTS)

- Intercept (b0): 13600.0
- Coefficient (b1): 2950.0
- Predicted Values for Test Data: [35700. 41500.]
- Regression graph displayed.

**RESULT:** Thus, Simple Linear Regression was implemented and the relationship between experience and salary was plotted.

---

## 7. Logistic Regression on Iris Dataset

**AIM:** To classify Iris flower species using Logistic Regression.

### ALGORITHM

1. Load the Iris dataset and split it into training and testing sets.
2. Train a Logistic Regression model.
3. Predict test labels.
4. Evaluate accuracy, confusion matrix and classification report.
5. Display the confusion-matrix heatmap.

### PROGRAM

```python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

iris = load_iris()
X, y = iris.data, iris.target
df = pd.DataFrame(X, columns=iris.feature_names)
df["species"] = y
print("IRIS Dataset:\n", df.head())

Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=42)
model = LogisticRegression(max_iter=200).fit(Xtr, ytr)
pred = model.predict(Xte)
cm = confusion_matrix(yte, pred)
print("\nAccuracy of the model:", round(accuracy_score(yte, pred) * 100, 2), "%")
print("\nConfusion Matrix:\n", cm)
print("\nClassification Report:\n",
      classification_report(yte, pred, target_names=iris.target_names))

sns.heatmap(cm, annot=True, cmap="Blues", fmt="g",
            xticklabels=iris.target_names, yticklabels=iris.target_names)
plt.title("Confusion Matrix - Logistic Regression on IRIS Dataset")
plt.xlabel("Predicted Labels"); plt.ylabel("True Labels"); plt.show()
```

### OUTPUT (KEY RESULTS)

- Accuracy of the model: 100.0%
- Confusion matrix: [[16,0,0],[0,13,0],[0,0,16]].
- Classification report: precision, recall and F1-score are 1.00 for all three classes.
- Confusion-matrix heatmap displayed.

**RESULT:** Thus, Logistic Regression successfully classified the Iris species with 100% accuracy.

---

## 8. Naïve Bayes Classifier

**AIM:** To classify Iris dataset samples using the Gaussian Naïve Bayes algorithm.

### ALGORITHM

1. Load and split the Iris dataset.
2. Train a Gaussian Naïve Bayes classifier.
3. Predict test labels.
4. Calculate accuracy, confusion matrix and classification report.
5. Display the confusion-matrix heatmap.

### PROGRAM

```python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

iris = load_iris()
X, y = iris.data, iris.target
df = pd.DataFrame(X, columns=iris.feature_names)
df["species"] = y
print("IRIS Dataset:\n", df.head())

Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=42)
model = GaussianNB().fit(Xtr, ytr)
pred = model.predict(Xte)
cm = confusion_matrix(yte, pred)
print("\nAccuracy of the model:", round(accuracy_score(yte, pred) * 100, 2), "%")
print("\nConfusion Matrix:\n", cm)
print("\nClassification Report:\n",
      classification_report(yte, pred, target_names=iris.target_names))

sns.heatmap(cm, annot=True, cmap="Greens", fmt="g",
            xticklabels=iris.target_names, yticklabels=iris.target_names)
plt.title("Confusion Matrix - Naive Bayes Classifier (Iris Dataset)")
plt.xlabel("Predicted Labels"); plt.ylabel("True Labels"); plt.show()
```

### OUTPUT (KEY RESULTS)

- Accuracy of the model: 97.78%
- Confusion matrix: [[16,0,0],[0,13,1],[0,0,15]].
- Classification report: setosa 1.00; versicolor F1-score 0.96; virginica F1-score 0.97.
- Confusion-matrix heatmap displayed.

**RESULT:** Thus, the Naïve Bayes classifier successfully classified the Iris dataset with approximately 98% accuracy.

---

## 9. Support Vector Machine (SVM) Classification

**AIM:** To classify Iris flower species using the SVM algorithm.

### ALGORITHM

1. Load and split the Iris dataset.
2. Create and train an SVM model with a linear kernel.
3. Predict test labels.
4. Evaluate accuracy, confusion matrix and classification report.
5. Plot the confusion-matrix heatmap.

### PROGRAM

```python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

iris = load_iris()
X, y = iris.data, iris.target
df = pd.DataFrame(X, columns=iris.feature_names)
df["species"] = y
print("IRIS Dataset:\n", df.head())

Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=42)
model = SVC(kernel="linear").fit(Xtr, ytr)
pred = model.predict(Xte)
cm = confusion_matrix(yte, pred)
print("\nAccuracy of the model:", round(accuracy_score(yte, pred) * 100, 2), "%")
print("\nConfusion Matrix:\n", cm)
print("\nClassification Report:\n",
      classification_report(yte, pred, target_names=iris.target_names))

sns.heatmap(cm, annot=True, cmap="Oranges", fmt="g",
            xticklabels=iris.target_names, yticklabels=iris.target_names)
plt.title("Confusion Matrix - SVM Classifier (Iris Dataset)")
plt.xlabel("Predicted Labels"); plt.ylabel("True Labels"); plt.show()
```

### OUTPUT (KEY RESULTS)

- Accuracy of the model: 100.0%
- Confusion matrix: [[16,0,0],[0,13,0],[0,0,16]].
- Precision, recall and F1-score are 1.00 for all three classes.
- Confusion-matrix heatmap displayed.

**RESULT:** Thus, the SVM classifier successfully classified the Iris dataset with 100% accuracy.

---

## 10. Case Study – Performance Analysis on a Dataset

**AIM:** To compare multiple machine learning algorithms using performance metrics.

### ALGORITHM

1. Load the Iris dataset and split it into training and testing sets.
2. Initialize Logistic Regression, Naïve Bayes, SVM, Decision Tree and KNN.
3. Train and test each model using the same split.
4. Print accuracy and classification reports.
5. Compare model accuracy using a bar graph.

### PROGRAM

```python
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report

iris = load_iris()
Xtr, Xte, ytr, yte = train_test_split(
    iris.data, iris.target, test_size=0.3, random_state=42)

models = {
    "Logistic Regression": LogisticRegression(max_iter=200),
    "Naive Bayes": GaussianNB(),
    "SVM": SVC(kernel="linear"),
    "Decision Tree": DecisionTreeClassifier(),
    "KNN": KNeighborsClassifier(n_neighbors=3)
}

scores = {}
for name, model in models.items():
    model.fit(Xtr, ytr)
    pred = model.predict(Xte)
    scores[name] = accuracy_score(yte, pred)
    print(f"\n{name} Accuracy: {scores[name] * 100:.2f}%")
    print(classification_report(yte, pred, target_names=iris.target_names))

plt.bar(scores.keys(), scores.values(),
        color=["blue", "green", "red", "purple", "orange"])
plt.title("Performance Comparison of ML Algorithms on Iris Dataset")
plt.ylabel("Accuracy"); plt.xlabel("Algorithm"); plt.ylim(0.9, 1.05)
for i, v in enumerate(scores.values()):
    plt.text(i, v + 0.005, f"{v:.2f}", ha="center")
plt.grid(); plt.show()
```

### OUTPUT (KEY RESULTS)

- Logistic Regression: 100.0%
- Naïve Bayes: 97.78%
- SVM: 100.0%
- Decision Tree: 100.0%
- KNN: 100.0%
- Classification reports and comparison bar graph displayed.

**RESULT:** Thus, the performance of five machine learning algorithms was compared. Logistic Regression, SVM, Decision Tree and KNN achieved 100% accuracy on the Iris dataset.
