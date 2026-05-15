import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models

# -----------------------
# SETTINGS
# -----------------------

IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
DATASET_PATH = "dataset"

# -----------------------
# DATA GENERATOR
# -----------------------

datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=20,
    zoom_range=0.2,
    horizontal_flip=True
)

train_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    subset="training"
)

val_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    subset="validation"
)

# -----------------------
# LOAD PRETRAINED MODEL
# -----------------------

base_model = MobileNetV2(
    weights='imagenet',
    include_top=False,
    input_shape=(224,224,3)
)

base_model.trainable = False

# -----------------------
# BUILD MODEL
# -----------------------

model = models.Sequential([
    base_model,

    layers.GlobalAveragePooling2D(),

    layers.Dense(128, activation='relu'),

    layers.Dropout(0.3),

    layers.Dense(
        train_data.num_classes,
        activation='softmax'
    )
])

# -----------------------
# COMPILE MODEL
# -----------------------

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# -----------------------
# TRAIN MODEL
# -----------------------

history = model.fit(
    train_data,
    validation_data=val_data,
    epochs=5
)

# -----------------------
# SAVE MODEL
# -----------------------

model.save(
    "saved_model/plant_disease_model.h5"
)

print("MODEL SAVED SUCCESSFULLY")